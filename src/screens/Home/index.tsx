import { useContext, useRef, useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Button, Center, IconButton, ScrollView, Spinner, useToast, View } from 'native-base'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { useQuery } from 'react-query'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'

import { commonColors } from '~constants'
import { Event } from '~services/models'
import { getManyEvents } from '~services/api'
import { EventCard } from '~components/EventCard'
import { EventMarker } from '~components/EventMarker'
import mapStyle from '~constants/map.style.json'
import { deltas, LocationContext } from '~contexts/Location.context'

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const { isLoading, currentLocation } = useContext(LocationContext)

  const { data: lastThreeEvents, refetch } = useQuery(
    ['many events'],
    () =>
      getManyEvents({
        limit: 3,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        kilometers: 1000
      }),
    { refetchInterval: 1000 * 30, retryOnMount: true, refetchOnMount: true }
  )
  const { data: nearEvents, refetch: refetchNearEvents } = useQuery(
    ['near events'],
    () =>
      getManyEvents({
        limit: 25,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        kilometers: 1000
      }),
    { retryOnMount: true, refetchOnMount: true, refetchOnReconnect: true }
  )

  const toast = useToast()
  const mapEl = useRef<MapView>(null)

  const handlePressEvent = (event: Event) => {
    navigation.navigate('EventDetails', { event })
  }

  if (currentLocation.latitude === 0 && currentLocation.longitude === 0) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  }

  useEffect(() => {
    async function fetch() {
      await refetch()
      await refetchNearEvents()
    }
    fetch()
  }, [currentLocation, isLoading])

  return (
    <View>
      <Button
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Search', { currentLocation })}
      >
        Ex: festa sleepover, pandora, arena...
      </Button>
      <IconButton
        style={styles.refreshButton}
        name="refresh"
        onPress={async () => {
          await refetchNearEvents()
          await refetch()
          toast.show({
            title: 'Eventos Atualizados',
            description: 'Os eventos próximos foram atualizados'
          })
        }}
      >
        <MaterialIcons name="refresh" size={20} color="white" />
      </IconButton>
      <MapView
        style={styles.map}
        region={{ ...currentLocation, ...deltas }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        ref={mapEl}
        showsBuildings={false}
        showsIndoors={false}
        showsUserLocation
        showsMyLocationButton={false}
        rotateEnabled
        loadingEnabled={isLoading}
      >
        {nearEvents?.events.map(event => (
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
      {!isLoading && lastThreeEvents?.events ? (
        <ScrollView horizontal style={styles.nearEventsList}>
          {lastThreeEvents.events.map(event => (
            <EventCard
              key={event.id}
              currentLocation={currentLocation}
              event={event}
              onPress={() => handlePressEvent(event)}
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  searchContainer: {
    position: 'absolute',
    left: 20,
    top: 42,
    zIndex: 5000,
    elevation: 1,
    minWidth: Dimensions.get('window').width - 100,
    height: 40,
    borderRadius: 8,
    backgroundColor: commonColors.primary[700],
    color: commonColors.lightText,
    justifyContent: 'flex-start'
  },
  refreshButton: {
    position: 'absolute',
    right: 20,
    top: 42,
    height: 40,
    width: 40,
    zIndex: 5000,
    borderColor: commonColors.white,
    borderWidth: 1
  },
  refresh: {
    width: 40,
    height: 40
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
