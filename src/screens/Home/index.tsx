import { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Alert } from 'react-native'
import { Button, Center, ScrollView, Spinner } from 'native-base'
import MapView, { Region, PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import { useQuery } from 'react-query'
import MapViewDirections from 'react-native-maps-directions'
import { BlurView } from 'expo-blur'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { commonColors } from '~constants'
import { websocketClient } from '~services/client'
import { Event } from '~services/models'
import { getEventById, getManyEvents } from '~services/api'
import { DirectionsTab } from '~components/DirectionsTab'
import { EventCard } from '~components/EventCard'
import { EventMarker } from '~components/EventMarker'

import mapStyle from './map.style.json'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

const initialPosition = {
  latitude: -23.563714,
  longitude: -46.654485
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen = ({ route, navigation }: HomeScreenProps): JSX.Element => {
  const eventId = route.params?.eventId

  const [position, setPosition] = useState<Region>({
    ...initialPosition,
    ...deltas
  })
  const {
    data: navigationData,
    isLoading,
    refetch
  } = useQuery(['navigation event'], () => (eventId ? getEventById(eventId) : null), { enabled: false })
  const { data: lastThreeEvents } = useQuery(['many events'], () =>
    getManyEvents({
      limit: 3,
      latitude: position.latitude,
      longitude: position.longitude,
      kilometers: 15,
      page: 1
    })
  )

  const [nearEvents, setNearEvents] = useState<Event[]>([])
  const mapEl = useRef<MapView>(null)
  const [initialDistance, setInitialDistance] = useState<number>()
  const [navigationState, setNavigationState] = useState<{ distance: number; duration: number }>()
  const [isNavigating, setIsNavigating] = useState<boolean>(Boolean(eventId))

  useEffect(() => {
    async function loadPosition() {
      const { status } = await requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Ops!', 'É necessário autorizar o uso do GPS para obter sua localização')
        return
      }

      const currentPosition = await getCurrentPositionAsync()

      const { latitude, longitude } = currentPosition.coords

      // setPosition({ latitude, longitude, ...deltas })
    }

    loadPosition()
  }, [])

  useEffect(() => {
    websocketClient.once('server:event:search-near', (response: { events: Event[] }) => {
      setNearEvents(response.events)
    })

    return () => {
      websocketClient.off('server:event:search-near')
    }
  }, [])

  console.log({ navigationData, eventId, isNavigating, isLoading })
  useEffect(() => {
    websocketClient.emit('client:event:search-near', position)
  }, [])

  useEffect(() => {
    if (eventId) {
      console.log('is navigating', eventId)
      setIsNavigating(true)
      refetch()
    }
  }, [eventId])

  useEffect(() => {
    if (navigationData?.event) {
      setPosition({
        latitude: navigationData.event.latitude,
        longitude: navigationData.event.longitude,
        ...deltas
      })
    }
  }, [navigationData?.event])

  const handleCancelNavigation = () => {
    setIsNavigating(false)
    setInitialDistance(undefined)
    setNavigationState(undefined)
    navigation.setParams({ eventId: null })
  }

  const handlePressEvent = (event: Event) => {
    navigation.navigate('EventDetails', { event })
  }

  return (
    <Center>
      {isLoading && (
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <Spinner color={commonColors.primary[700]} />
        </BlurView>
      )}
      <Button
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Search', { currentLocation: position })}
      >
        Ex: festa sleepover, pandora, arena...
      </Button>
      <MapView
        style={styles.map}
        initialRegion={position}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        ref={mapEl}
        showsBuildings={false}
        showsIndoors={false}
        cacheEnabled
        showsUserLocation
        followsUserLocation
        loadingEnabled={Object.values(position) === Object.values({ ...initialPosition, ...deltas })}
      >
        {isNavigating && navigationData?.event && (
          <MapViewDirections
            origin={position}
            destination={{
              latitude: +navigationData.event.latitude,
              longitude: +navigationData.event.longitude
            }}
            apikey="AIzaSyCJr5eb7ScccyD3PY0_1ApgtAtdl_Wu6OY"
            strokeWidth={3}
            strokeColor={commonColors.secondary[600]}
            language="pt-br"
            mode="DRIVING"
            lineCap="round"
            onReady={result => {
              mapEl.current?.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 50, bottom: 50, left: 50, right: 50 }
              })
              setInitialDistance(result.distance)
              // distance = kms, duration = minutes
              setNavigationState({ distance: result.distance, duration: result.duration })
            }}
          />
        )}
        {nearEvents.map(event => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: +event.latitude,
              longitude: +event.longitude
            }}
            onPress={() => handlePressEvent(event)}
          >
            <EventMarker event={event} />
          </Marker>
        ))}
      </MapView>
      {isNavigating && !navigationData?.event && navigationState && initialDistance && (
        <DirectionsTab
          initialDistance={initialDistance}
          {...navigationState}
          onCancel={handleCancelNavigation}
        />
      )}
      {!isNavigating && lastThreeEvents?.events && (
        <ScrollView horizontal style={styles.nearEventsList}>
          {lastThreeEvents.events.map(event => (
            <EventCard
              key={event.id}
              currentLocation={position}
              event={event}
              onPress={() => handlePressEvent(event)}
            />
          ))}
        </ScrollView>
      )}
      {isNavigating && navigationState && initialDistance && (
        <DirectionsTab
          distance={navigationState.distance}
          initialDistance={initialDistance}
          duration={navigationState.duration}
          onCancel={() => handleCancelNavigation()}
        />
      )}
    </Center>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  searchContainer: {
    position: 'absolute',
    left: 40,
    top: 42,
    zIndex: 5000,
    elevation: 1,
    minWidth: Dimensions.get('window').width - 80,
    height: 40,
    borderRadius: 8,
    backgroundColor: commonColors.primary[700],
    color: commonColors.lightText,
    justifyContent: 'flex-start'
  },
  searchBar: {
    borderRadius: 16,
    fontWeight: 'bold'
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  nearEventsList: {
    position: 'absolute',
    bottom: 32
  }
})
