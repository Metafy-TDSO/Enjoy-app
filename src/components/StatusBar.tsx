import { StatusBar as ExpoStatusBar, StatusBarProps } from 'expo-status-bar'
import { useColorMode } from 'native-base'

export const StatusBar = (props: StatusBarProps): JSX.Element => {
  const { colorMode } = useColorMode()

  return (
    <ExpoStatusBar
      animated
      hideTransitionAnimation="fade"
      style={colorMode === 'dark' ? 'light' : 'dark'}
      {...props}
    />
  )
}
