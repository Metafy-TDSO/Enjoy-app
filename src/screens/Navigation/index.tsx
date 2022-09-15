import { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Alert, Platform, Linking } from 'react-native'
import { Button, Center, useToast } from 'native-base'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { useQuery } from 'react-query'
import MapViewDirections, { MapDirectionsResponse } from 'react-native-maps-directions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { commonColors } from '~constants'
import { Event } from '~services/models'
import { getEventById } from '~services/api'
import { DirectionsTab } from '~components/DirectionsTab'
import { EventMarker } from '~components/EventMarker'
import mapStyle from '~constants/map.style.json'
import { deltas, LocationContext } from '~contexts/Location.context'

export type NavigationScreenProps = NativeStackScreenProps<RootStackParamList, 'Navigation'>

export const NavigationScreen: React.FC<NavigationScreenProps> = ({ route, navigation }) => {
  if (!route.params?.eventId) {
    navigation.navigate('Home')
    return null
  }

  const { eventId } = route.params
  const { currentLocation } = useContext(LocationContext)
  const {
    data: navigationData,
    isLoading,
    error
  } = useQuery(['navigation event'], () => getEventById(eventId))

  const toast = useToast()
  const mapEl = useRef<MapView>(null)
  const [navigationState, setNavigationState] = useState<{ currentDistance: number; duration: number }>()

  useEffect(() => {
    if (error) {
      toast.show({
        title: 'Erro',
        description: 'Não foi possível carregar o evento',
        tintColor: 'danger.500'
      })
    }
  }, [error])

  const handleCancelNavigation = () => {
    setNavigationState(undefined)
    navigation.setParams({ eventId: null })
    navigation.navigate('Home')
  }

  const handlePressEvent = (event: Event) => {
    navigation.navigate('EventDetails', { event })
  }

  const handleStartNavigation = (result: MapDirectionsResponse) => {
    mapEl.current?.fitToCoordinates(result.coordinates, {
      edgePadding: { top: 10, bottom: 10, left: 10, right: 10 },
      animated: false
    })
    setNavigationState({ currentDistance: result.distance, duration: result.duration })
  }

  const handleOpenNavigation = async () => {
    if (navigationData?.event) {
      const { latitude, longitude } = navigationData.event

      const latLng = `${latitude},${longitude}`

      const url =
        Platform.OS === 'ios'
          ? `http //maps.apple.com/?ll=${latLng}`
          : `https://www.google.com/maps/dir/?api=1&destination=${latLng}`

      try {
        await Linking.openURL(url)
      } catch (e) {
        console.error(e)
        toast.show({
          title: 'Erro',
          description: 'Não foi possível abrir o mapa',
          tintColor: 'danger.500'
        })
        handleCancelNavigation()
      }
    } else {
      toast.show({
        title: 'Erro',
        description: 'Não foi possível abrir o mapa',
        tintColor: 'danger.500'
      })
      handleCancelNavigation()
    }
  }
  return (
    <Center>
      <Button
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Search', { currentLocation })}
      >
        Ex: festa sleepover, pandora, arena...
      </Button>
      <MapView
        style={styles.map}
        initialRegion={{ ...currentLocation, ...deltas }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        ref={mapEl}
        showsBuildings={false}
        showsIndoors={false}
        showsUserLocation
        showsMyLocationButton={false}
        rotateEnabled
        loadingEnabled={isLoading || !navigationData?.event}
      >
        <MapViewDirections
          origin={{ ...currentLocation, ...deltas }}
          destination={
            navigationData?.event && {
              latitude: +navigationData.event.latitude,
              longitude: +navigationData.event.longitude
            }
          }
          // Mocked for FIAP purposes
          apikey="AIzaSyCJr5eb7ScccyD3PY0_1ApgtAtdl_Wu6OY"
          strokeWidth={5}
          strokeColor={commonColors.secondary[600]}
          language="pt-br"
          lineCap="round"
          lineJoin="round"
          resetOnChange={false}
          onError={error => {
            console.error(error)
            Alert.alert('Ops!', 'Não foi possível carregar a rota')
            handleCancelNavigation()
          }}
          onReady={handleStartNavigation}
        />
        {navigationData ? (
          <Marker
            key={navigationData.event.id}
            coordinate={{
              latitude: +navigationData.event.latitude,
              longitude: +navigationData.event.longitude
            }}
            onPress={() => handlePressEvent(navigationData.event)}
          >
            <EventMarker event={navigationData.event} isSelected={navigationData.event.id === eventId} />
          </Marker>
        ) : null}
      </MapView>
      {navigationState ? (
        <DirectionsTab
          currentDistance={navigationState.currentDistance}
          duration={navigationState.duration}
          onCancel={() => handleCancelNavigation()}
          onOpenRoute={() => handleOpenNavigation()}
        />
      ) : null}
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
  }
})
