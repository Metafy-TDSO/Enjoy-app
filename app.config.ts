import { ExpoConfig, ConfigContext } from '@expo/config'

const appName = 'Enjoy'
const versionBuild = '0.0.1'

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
      buildNumber: versionBuild
    },
    android: {
      package: 'com.metafy.enjoy',
      versionCode: 1
    }
  }
}
