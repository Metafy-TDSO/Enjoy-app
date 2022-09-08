import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

declare global {
  type HomeStackParamList = {
    Home: undefined
    EventDetails: { id: string }
    Search: undefined
    // TODO(guilherme-vp): Adicionar props da página de navegação
    Navigation: undefined
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
