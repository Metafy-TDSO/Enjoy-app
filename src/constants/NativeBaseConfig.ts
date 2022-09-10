import { LinearGradient } from 'expo-linear-gradient'
import type { INativebaseConfig } from 'native-base'
import { theme } from './theme'

export const nativeBaseConfig: INativebaseConfig = {
  theme,
  dependencies: {
    'linear-gradient': LinearGradient
  }
}
