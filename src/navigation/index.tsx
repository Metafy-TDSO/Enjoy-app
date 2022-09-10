import { NavigationContainer, NavigationState } from '@react-navigation/native'
import { FC, useCallback } from 'react'

import { StatusBar } from '~components'
import { useScreenTracker, useNavigationStatePersistence } from '~hooks'
import { navigationTheme } from '~constants'

import { RootNavigator } from './RootNavigator'

export const Navigation: FC = () => {
  const { navigationRef, onReady, onStateChange: onStateChangeScreenTracker } = useScreenTracker()

  const {
    isReady,
    initialState,
    onStateChange: onStateChangeNavigationStatePersistance
  } = useNavigationStatePersistence()

  const onStateChange = useCallback(
    (state: NavigationState | undefined) => {
      onStateChangeScreenTracker()
      onStateChangeNavigationStatePersistance(state)
    },
    [onStateChangeNavigationStatePersistance, onStateChangeScreenTracker]
  )

  if (!isReady) {
    return null
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onStateChange}
        theme={navigationTheme}
        initialState={initialState}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  )
}
