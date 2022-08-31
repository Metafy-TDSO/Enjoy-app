import { createStackNavigator } from '@react-navigation/stack'

import { DetailsScreen, HomeScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const HomeStack = (): JSX.Element => {
  return (
    <Navigator>
      <Screen name="Home" options={{ title: 'Home' }} component={HomeScreen} />
      <Screen name="Details" options={{ title: 'Detalhes' }} component={DetailsScreen} />
    </Navigator>
  )
}
