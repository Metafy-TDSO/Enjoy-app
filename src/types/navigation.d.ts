import type { Event, Region } from '~services/models'

declare global {
  type HomeStackParamList = {
    Home: { eventId?: number | null } | undefined
    Navigation: { eventId?: number | null } | undefined
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
