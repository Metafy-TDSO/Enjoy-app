import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { HomeStack } from './HomeStack'

const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()

export const RootNavigator: FC = () => {
  return (
    <Navigator>
      <Group key="authorized">
        <Screen name="HomeScreen" options={{ title: 'Home' }} component={HomeStack} />
      </Group>
      {/* <Group key="modals" screenOptions={{ presentation: 'modal' }}>
        <Screen
          name="EventInfo"
          options={{ title: t('navigation.screen_titles.event_info') }}
          component={EventInfoScreen}
        />
      </Group> */}
    </Navigator>
  )
}
