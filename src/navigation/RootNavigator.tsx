import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, EventDetails, SearchScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export const RootNavigator = (): JSX.Element => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardShadowEnabled: true
      }}
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen
        name="EventDetails"
        options={{
          presentation: 'modal'
        }}
        component={EventDetails}
      />
      <Screen name="Search" component={SearchScreen} />
    </Navigator>
  )
}
