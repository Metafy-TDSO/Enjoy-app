import 'react-native-gesture-handler'
import 'react-native-reanimated'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { registerRootComponent } from 'expo'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AppLoading } from '~components'
import { theme, nativeBaseConfig } from '~constants'
import { Navigation } from '~navigation'
import { NativeBaseProvider } from 'native-base'

const App = (): JSX.Element => {
  return (
    <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
      <AppLoading>
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <BottomSheetModalProvider>
            <Navigation />
          </BottomSheetModalProvider>
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
