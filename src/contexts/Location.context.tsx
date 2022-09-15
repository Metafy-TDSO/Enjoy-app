import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import { useToast } from 'native-base'
import { useState, useEffect, createContext, PropsWithChildren } from 'react'

interface LocationRegion {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
}

export interface LocationContextProps {
  currentLocation: LocationRegion
}

export const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export const initialPosition = {
  latitude: -37.43,
  longitude: -122.084
}

export const LocationContext = createContext<LocationContextProps>({
  currentLocation: { ...initialPosition, ...deltas }
})

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const toast = useToast()
  const [currentLocation, setCurrentLocation] = useState<LocationRegion>({ ...initialPosition, ...deltas })

  useEffect(() => {
    async function loadPosition() {
      const { status } = await requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        toast.show({
          title: 'Erro',
          description: 'É necessário autorizar o uso do GPS para obter sua localização',
          tintColor: 'danger.500'
        })
        return
      }

      const currentPosition = await getCurrentPositionAsync()

      const { latitude, longitude } = currentPosition.coords

      setCurrentLocation({ latitude, longitude, ...deltas })
      // mapEl.current?.animateToRegion({ latitude, longitude, ...deltas })

      // searchNearEvents()
    }

    loadPosition()
  }, [])

  return <LocationContext.Provider value={{ currentLocation }}>{children}</LocationContext.Provider>
}
