import { ExpoConfig, ConfigContext } from '@expo/config'

const appName = 'Enjoy'
const versionBuild = '0.1.0'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      universalLinks: []
    },
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
      buildNumber: versionBuild,
      config: { googleMapsApiKey: 'AIzaSyCJr5eb7ScccyD3PY0_1ApgtAtdl_Wu6OY' }
    },
    android: {
      package: 'com.metafy.enjoy',
      versionCode: 1,
      config: {
        googleMaps: { apiKey: 'AIzaSyCJr5eb7ScccyD3PY0_1ApgtAtdl_Wu6OY' }
      }
    }
  }
}
