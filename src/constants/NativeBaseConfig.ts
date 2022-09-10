import { LinearGradient } from 'expo-linear-gradient'

import { theme } from './theme'

import type { INativebaseConfig } from 'native-base'

export const nativeBaseConfig: INativebaseConfig = {
  theme,
  dependencies: {
    'linear-gradient': LinearGradient
  }
}
