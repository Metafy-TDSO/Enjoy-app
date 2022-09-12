import 'dotenv/config'

import { ExpoConfig, ConfigContext } from '@expo/config'

const appName = 'Enjoy'
const versionBuild = '0.0.1'

function convertToAndroidVersion(version: string): number {
  const splittedVersion = version.split('.')

  return Number(`${splittedVersion.splice(0, 1)}.${splittedVersion.join('')}`)
}

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
      config: {
        googleMapsApiKey: process.env.GOOGLE_API_KEY
      }
    },
    android: {
      package: 'com.metafy.enjoy',
      versionCode: convertToAndroidVersion(versionBuild),
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY
        }
      }
    }
  }
}
