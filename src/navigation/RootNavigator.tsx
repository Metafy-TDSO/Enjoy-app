import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, EventDetails, SearchScreen, NavigationScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export const RootNavigator = (): JSX.Element => {
  return (
    <Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="EventDetails" component={EventDetails} />
      <Screen name="Search" component={SearchScreen} />
      <Screen name="Navigation" component={NavigationScreen} />
    </Navigator>
  )
}
