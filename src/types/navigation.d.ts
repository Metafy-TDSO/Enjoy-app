import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
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
    interface RootParamList extends RootStackParamList {}
  }

  // Root stack
  type RootStackScreenProps = RootStackComposite
}

type RootStackComposite<S extends keyof RootStackParamList = keyof RootStackParamList> =
  CompositeScreenProps<StackScreenProps<RootStackParamList, S>, any>
