import { Avatar, View, VStack } from 'native-base'
import { StyleSheet } from 'react-native'

import { commonColors } from '~constants'
import { Event } from '~services/models'

export interface EventMarkerProps {
  event: Event
}

export const EventMarker: React.FC<EventMarkerProps> = ({ event }) => {
  return (
    <VStack alignItems="center" style={styles.container}>
      <Avatar style={styles.avatar} source={{ uri: event.imageUrl }} />
      <View style={styles.triangle} />
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 128,
    height: 128
  },
  avatar: {
    borderWidth: 2,
    borderColor: commonColors.white
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: commonColors.white,
    transform: [{ rotate: '180deg' }]
  }
})
