import { StyleSheet, Dimensions } from 'react-native'
import { HStack, Icon, Progress, Text, View, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
/* eslint-disable import/no-duplicates */
import { formatDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'
/* eslint-enable import/no-duplicates */

import { CloseButton } from '~components/CloseButton'
import { commonColors } from '~constants'

interface DirectionsTabProps {
  initialDistance: number
  distance: number
  duration: number
  onCancel: () => void
}

export const DirectionsTab = ({ onCancel, distance, duration, initialDistance }: DirectionsTabProps) => {
  return (
    <View style={styles.tabContainer} alignItems="center">
      <VStack>
        <CloseButton onClose={onCancel} avatarProps={{ style: styles.closeButton }} />
        <HStack justifyContent="space-between">
          <HStack>
            <Icon as={MaterialIcons} name="location-on" size="sm" />
            <Text>{distance}</Text>
          </HStack>
          <HStack>
            <Icon as={MaterialIcons} name="access-time" size="sm" />
            <Text>{formatDuration({ minutes: duration }, { locale: ptBR, format: ['m', 's'] })}</Text>
          </HStack>
        </HStack>
        <Progress value={(distance / initialDistance) * 100} />
      </VStack>
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    height: 120,
    width: Dimensions.get('window').width,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: commonColors.primary[500]
  },
  closeButton: {
    marginTop: -32
  }
})
