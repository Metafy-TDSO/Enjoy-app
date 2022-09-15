import { ExpoConfig, ConfigContext } from '@expo/config'

const appName = 'Enjoy'
const versionBuild = '0.1.0'
const projectId = 'c47b3ce9-dc3b-4d8c-8170-2af13edf6eef'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      universalLinks: [],
      eas: {
        projectId
      }
    },
    scheme: 'enjoy',
    name: appName,
    slug: appName,
    version: versionBuild,
    orientation: 'portrait',
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.metafy.enjoy',
      config: { googleMapsApiKey: 'AIzaSyCJr5eb7ScccyD3PY0_1ApgtAtdl_Wu6OY' },
      supportsTablet: true
    },
    android: {
      package: 'com.metafy.enjoy',
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#0D0A14'
      },
      config: {
        googleMaps: { apiKey: 'AIzaSyCJr5eb7ScccyD3PY0_1ApgtAtdl_Wu6OY' }
      }
    }
  }
}
