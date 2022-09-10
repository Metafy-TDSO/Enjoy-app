import * as Font from 'expo-font'
import { useEffect, useState } from 'react'
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter'

export const useCachedResources = (): boolean => {
  const [fontsLoaded] = Font.useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black
  })

  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    if (fontsLoaded) setLoadingComplete(true)
  }, [fontsLoaded])

  return isLoadingComplete
}
