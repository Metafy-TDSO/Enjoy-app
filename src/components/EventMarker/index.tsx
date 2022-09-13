import { Avatar, View, VStack } from 'native-base'
import { StyleSheet } from 'react-native'

import { commonColors } from '~constants'
import { Event } from '~services/models'

export interface EventMarkerProps {
  event: Event
  isSelected?: boolean
}

export const EventMarker: React.FC<EventMarkerProps> = ({ event, isSelected = false }) => {
  return (
    <VStack alignItems="center">
      <Avatar
        style={[styles.avatar, { borderColor: isSelected ? commonColors.secondary[600] : 'white' }]}
        source={{ uri: event.imageUrl }}
      />
      <View
        style={[styles.triangle, { borderBottomColor: isSelected ? commonColors.secondary[600] : 'white' }]}
      />
    </VStack>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: commonColors.white,
    marginBottom: -4,
    zIndex: 2
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
    transform: [{ rotate: '180deg' }],
    zIndex: 1
  }
})
