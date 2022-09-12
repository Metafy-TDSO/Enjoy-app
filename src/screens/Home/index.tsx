import { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Alert } from 'react-native'
import { Center, Container, Input, ScrollView, Spinner } from 'native-base'
import MapView, { Region, PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import { useQuery } from 'react-query'
import MapViewDirections from 'react-native-maps-directions'
import { BlurView } from 'expo-blur'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { commonColors, fontSizes, GOOGLE_MAPS_APIKEY } from '~constants'
import { websocketClient } from '~services/client'
import { Event } from '~services/models'
import { getEventById } from '~services/api'
import { DirectionsTab } from '~components/NavigationTab'
import { EventCard } from '~components/EventCard'

import mapStyle from './map.style.json'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen = ({ route, navigation }: HomeScreenProps): JSX.Element => {
  const eventId = route.params?.eventId

  const [position, setPosition] = useState<Region>({ latitude: 0, longitude: 0, ...deltas })
  const { data: navigationData, isLoading } = useQuery(['navigation event'], () =>
    eventId ? getEventById(eventId) : null
  )
  const [nearEvents, setNearEvents] = useState<Event[]>()
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

      setPosition({ latitude, longitude, ...deltas })
    }

    loadPosition()
  }, [])

  useEffect(() => {
    websocketClient.on('server:event:search-near', (events: Event[]) => {
      setNearEvents(events)
    })

    return () => {
      websocketClient.off('server:event:search-near')
    }
  }, [])

  useEffect(() => {
    setInterval(() => {
      if (position.latitude > 0 && position.longitude > 0) {
        websocketClient.emit('client:event:search-near', position)
      }
    }, 2000)
  }, [])

  const handleCancelNavigation = () => {
    setIsNavigating(false)
    setInitialDistance(undefined)
    setNavigationState(undefined)
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
      <Container style={styles.searchContainer}>
        <Input
          variant="unstyled"
          placeholder="Ex: festa sleepover, pandora, arena..."
          onPressIn={() => navigation.navigate('Search', { currentLocation: position })}
          fontSize={fontSizes.xs}
          style={styles.searchBar}
        />
      </Container>
      <MapView
        style={styles.map}
        initialRegion={position}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        ref={mapEl}
        showsBuildings={false}
        showsIndoors={false}
        cacheEnabled
        loadingEnabled={position.latitude === 0}
      >
        {isNavigating && navigationData?.event && (
          <MapViewDirections
            origin={position}
            destination={{
              latitude: navigationData.event.latitude,
              longitude: navigationData.event.longitude
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor={commonColors.secondary[600]}
            language="pt-br"
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
        {!isNavigating &&
          nearEvents?.map(event => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude
              }}
              icon={require('~assets/marker.png')}
              onPress={() => handlePressEvent(event)}
            />
          ))}
      </MapView>
      {isNavigating && !navigationData?.event && navigationState && initialDistance && (
        <DirectionsTab
          initialDistance={initialDistance}
          {...navigationState}
          onCancel={handleCancelNavigation}
        />
      )}
      {!isNavigating && (
        <ScrollView horizontal style={styles.nearEventsList}>
          {nearEvents?.map(event => (
            <EventCard
              key={event.id}
              currentLocation={position}
              event={event}
              onPress={() => handlePressEvent(event)}
            />
          ))}
        </ScrollView>
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
    top: 32,
    zIndex: 5000,
    elevation: 1,
    minWidth: Dimensions.get('window').width - 80
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
