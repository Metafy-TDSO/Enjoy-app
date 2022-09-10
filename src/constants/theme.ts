import type { Theme } from '@react-navigation/native'
import { extendTheme } from 'native-base'

export const commonColors = {
  white: '#FFF',
  black: '#000',
  lightText: '#FFF',
  subText: '#C3C3C3',
  primary: {
    50: '#e9eeff',
    100: '#c4ccf0',
    200: '#9faae1',
    300: '#7a88d2',
    400: '#5566c4',
    500: '#3b4caa',
    600: '#8662D3',
    700: '#8029FF',
    800: '#8029FF',
    900: '#8029FF'
  },
  secondary: {
    50: '#ffe1f1',
    100: '#ffb1cf',
    200: '#ff7ead',
    300: '#ff4c8c',
    400: '#ff1a6b',
    500: '#64D5D8',
    600: '#64D5D8',
    700: '#82002d',
    800: '#50001a',
    900: '#21000a'
  },
  background: '#0D0A14',
  border: '#C3C3C3',
  card: '#333'
}

export const fontSizes = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40
} as const

const scale = fontSizes.md

export const space = {
  px: '1',
  '0': 0,
  '0.5': 0.125 * scale,
  '1': 0.25 * scale,
  '2': 0.5 * scale,
  '3': 0.75 * scale,
  '4': scale,
  '5': 1.25 * scale,
  '6': 1.5 * scale,
  '7': 1.75 * scale,
  '8': 2 * scale,
  '9': 2.25 * scale,
  '10': 2.5 * scale,
  '12': 3 * scale,
  '16': 4 * scale,
  '20': 5 * scale,
  '24': 6 * scale,
  '32': 8 * scale,
  '40': 10 * scale,
  '48': 12 * scale,
  '56': 14 * scale,
  '64': 16 * scale,
  '72': 18 * scale,
  '80': 20 * scale,
  '96': 24 * scale
} as const

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark'
  },
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter_100Thin'
      },
      200: {
        normal: 'Inter_200ExtraLight'
      },
      300: {
        normal: 'Inter_300Light'
      },
      400: {
        normal: 'Inter_400Regular'
      },
      500: {
        normal: 'Inter_500Medium'
      },
      600: {
        normal: 'Inter_600SemiBold'
      },
      700: {
        normal: 'Inter_700Bold'
      },
      800: {
        normal: 'Inter_800ExtraBold'
      }
    }
  },
  fonts: {
    body: 'Inter',
    heading: 'Inter',
    mono: 'Inter'
  },
  components: {
    Input: {
      baseStyle: () => ({
        _input: { bg: commonColors.primary[800] },
        _dark: {
          _focus: {
            borderColor: commonColors.secondary[600]
          },
          placeholderTextColor: commonColors.subText,
          borderColor: commonColors.primary[800],
          color: commonColors.lightText
        }
      })
    }
  }
})

export const navigationTheme: Theme = {
  colors: {
    background: '#0D0A14',
    border: '#C3C3C3',
    card: theme.colors.dark[900],
    notification: theme.colors.red[400],
    primary: '#8662D3',
    text: '#FFF'
  },
  dark: true
}
