import * as SplashScreen from 'expo-splash-screen'
import { FC, Fragment, PropsWithChildren, useEffect } from 'react'
import { useCachedResources } from '~hooks'

SplashScreen.preventAutoHideAsync()

export const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const isLoadingComplete = useCachedResources()

  useEffect(() => {
    if (isLoadingComplete) {
      SplashScreen.hideAsync()
    }
  }, [isLoadingComplete])

  if (!isLoadingComplete) {
    return null
  }

  return <Fragment>{children}</Fragment>
}
