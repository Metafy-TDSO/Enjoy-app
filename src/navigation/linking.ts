/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native'
import Constants from 'expo-constants'
import { createURL } from 'expo-linking'

const prefix = createURL('/')
const universalLinks = Constants.manifest?.extra?.universalLinks ?? []

// Visit https://reactnavigation.org/docs/configuring-links#playground to see more
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, ...universalLinks],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: '',
      EventDetails: '/details/:id',
      Search: '/search',
      Navigation: '/navigation'
      // screens: {
      //   HomeStack: {
      //     initialRouteName: 'Home',
      //     screens: {
      //     }
      //   },
      //   ExamplesStack: {
      //     initialRouteName: 'Examples',
      //     screens: {
      //       Examples: '/examples',
      //       Components: '/components',
      //       Colors: '/colors',
      //       Typography: '/typography'
      //     }
      //   }
      // }
      // SignIn: 'sign-in',
      // SignUp: 'sign-up',
      // NotFound: '*',
    }
  }
}
