import { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Alert } from 'react-native'
import { Button, Center, ScrollView, Spinner } from 'native-base'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import {
  getCurrentPositionAsync,
  watchPositionAsync,
  requestForegroundPermissionsAsync
} from 'expo-location'
import { useQuery } from 'react-query'
import MapViewDirections, { MapDirectionsResponse } from 'react-native-maps-directions'
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
  latitude: 0,
  longitude: 0
}

interface LocationRegion {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
  heading?: number
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen = ({ route, navigation }: HomeScreenProps): JSX.Element => {
  const eventId = route.params?.eventId

  const [position, setPosition] = useState<LocationRegion>({
    ...initialPosition,
    ...deltas,
    heading: 0
  })

  const {
    data: navigationData,
    isLoading,
    refetch
  } = useQuery(['navigation event'], () => (eventId ? getEventById(eventId) : null), {
    enabled: false
  })

  const { data: lastThreeEvents } = useQuery(
    ['many events'],
    () =>
      getManyEvents({
        limit: 3,
        latitude: position.latitude,
        longitude: position.longitude,
        kilometers: 15,
        page: 1
      }),
    { refetchInterval: 1000 * 60 * 2 }
  )

  const [nearEvents, setNearEvents] = useState<Event[]>([])
  const mapEl = useRef<MapView>(null)
  const [initialDistance, setInitialDistance] = useState<number>()
  const [navigationState, setNavigationState] = useState<{ currentDistance: number; duration: number }>()
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

      setPosition({ latitude, longitude })
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

  useEffect(() => {
    websocketClient.emit('client:event:search-near', position)
  }, [])

  useEffect(() => {
    if (eventId) {
      setIsNavigating(true)
      refetch()
    }
  }, [eventId])

  useEffect(() => {
    if (navigationData?.event) {
      setPosition({
        latitude: +navigationData.event.latitude,
        longitude: +navigationData.event.longitude
      })
      mapEl.current?.animateCamera(
        {
          center: {
            latitude: +navigationData.event.latitude,
            longitude: +navigationData.event.longitude
          }
        },
        { duration: 1000 }
      )
    }
  }, [navigationData?.event])

  useEffect(() => {
    async function watcher() {
      await watchPositionAsync({}, position => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          ...deltas
        })
      })
    }
    if (isNavigating) watcher()
  }, [isNavigating])

  const handleCancelNavigation = () => {
    setIsNavigating(false)
    setInitialDistance(undefined)
    setNavigationState(undefined)
    navigation.setParams({ eventId: null })
  }

  const handlePressEvent = (event: Event) => {
    navigation.navigate('EventDetails', { event })
  }

  const handleStartNavigation = (result: MapDirectionsResponse) => {
    mapEl.current?.fitToCoordinates(result.coordinates, {
      animated: true,
      edgePadding: { top: 50, bottom: 50, left: 50, right: 50 }
    })
    if (!initialDistance) {
      setInitialDistance(result.distance)
    }
    // distance = kms, duration = minutes
    setNavigationState({ currentDistance: result.distance, duration: result.duration })
  }

  if (position.latitude === 0 && position.longitude === 0) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  }

  console.log({ isNavigating, navigationState, initialDistance })

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
        initialRegion={{ ...position, ...deltas }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        ref={mapEl}
        showsBuildings={false}
        showsIndoors={false}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
        showsCompass
        showsPointsOfInterest
        toolbarEnabled
        rotateEnabled
        scrollDuringRotateOrZoomEnabled
        zoomControlEnabled
        loadingEnabled={Object.values(position) === Object.values({ ...initialPosition, ...deltas })}
      >
        {/* {isNavigating && navigationData?.event && (
          <Marker coordinate={position} flat>
            <Icon
              as={<MaterialIcons name="navigation" />}
              color={commonColors.white}
              style={{
                transform: [{ rotate: `${position.heading ?? 90}deg` }]
              }}
            />
          </Marker>
        )} */}
        {isNavigating && navigationData?.event && (
          <MapViewDirections
            origin={position}
            destination={{
              latitude: +navigationData.event.latitude,
              longitude: +navigationData.event.longitude
            }}
            // Mocked for FIAP purposes
            apikey="AIzaSyCJr5eb7ScccyD3PY0_1ApgtAtdl_Wu6OY"
            strokeWidth={5}
            strokeColor={commonColors.secondary[600]}
            language="pt-br"
            mode="DRIVING"
            lineCap="round"
            lineJoin="round"
            onError={error => {
              console.error(error)
              handleCancelNavigation()
            }}
            onReady={handleStartNavigation}
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
            <EventMarker event={event} isSelected={event.id === eventId} />
          </Marker>
        ))}
      </MapView>
      {isNavigating && navigationData?.event && navigationState && initialDistance && (
        <DirectionsTab
          {...navigationState}
          initialDistance={initialDistance}
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
          currentDistance={navigationState.currentDistance}
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
    bottom: 40
  }
})
