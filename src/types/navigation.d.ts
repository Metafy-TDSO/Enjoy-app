import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

declare global {
  // PARAMS
  type HomeStackParamList = {
    Home: undefined
    Details: { id: string }
  }

  type MainTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>
  }

  type RootStackParamList = {
    HomeScreen: undefined

    // modals
    EventInfo: undefined
  }

  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }

  // SCREENS - specific screens props
  // You can get navigation or route prop for every screen f. eg.
  // - HomeScreenNavigationProps['route']
  // - HomeScreenNavigationProps['navigation']

  // Root stack
  type RootStackScreenProps = RootStackComposite

  // // Home stack
  // type HomeScreenProps = HomeStackComposite<'Home'>
  //   type DetailsScreenProps = HomeStackComposite<'Details'>
}

type RootStackComposite<S extends keyof RootStackParamList = keyof RootStackParamList> =
  CompositeScreenProps<StackScreenProps<RootStackParamList, S>, any>

// type HomeStackComposite<S extends keyof HomeStackParamList> = CompositeScreenProps<
//   CompositeScreenProps<
//     StackScreenProps<HomeStackParamList, S>,'HomeStack'>
//   >,
//   StackScreenProps<RootStackParamList, 'MainTab'>
// >
