import type { Event, Region } from '~services/models'

declare global {
  type HomeStackParamList = {
    Home: { eventId?: number } | undefined
    EventDetails: { event: Event }
    Search: {
      currentLocation: Region
    }
  }

  type RootStackParamList = HomeStackParamList

  namespace ReactNavigation {
    type RootParamList = RootStackParamList
  }
}
