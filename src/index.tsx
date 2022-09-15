import 'react-native-reanimated'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { registerRootComponent } from 'expo'
import { StyleSheet } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { QueryClientProvider } from 'react-query'

import { AppLoading } from '~components'
import { theme, nativeBaseConfig } from '~constants'
import { Navigation } from '~navigation'
import { queryClient } from '~services/client'
import { LocationProvider } from '~contexts/Location.context'

const App = (): JSX.Element => {
  return (
    <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
      <AppLoading>
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <LocationProvider>
                <Navigation />
              </LocationProvider>
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </AppLoading>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1
  }
})

registerRootComponent(App)

export default App
