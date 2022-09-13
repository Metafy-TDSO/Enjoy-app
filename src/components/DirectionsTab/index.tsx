import { StyleSheet, Dimensions } from 'react-native'
import { HStack, Icon, Progress, Text, View, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
/* eslint-disable import/no-duplicates */
import { formatDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'
/* eslint-enable import/no-duplicates */

import { CloseButton } from '~components/CloseButton'
import { commonColors, fontSizes, space } from '~constants'

interface DirectionsTabProps {
  initialDistance: number
  currentDistance: number
  duration: number
  onCancel: () => void
}

export const DirectionsTab = ({
  onCancel,
  currentDistance,
  duration,
  initialDistance
}: DirectionsTabProps) => {
  console.log({ currentDistance, duration, initialDistance })
  return (
    <View style={styles.tabContainer}>
      <VStack style={styles.container} space={space[1]}>
        <CloseButton onClose={onCancel} avatarProps={{ style: styles.closeButton }} />
        <HStack justifyContent="center" space={space[1]}>
          <HStack alignItems="center" space="4px">
            <Icon color="white" as={MaterialIcons} name="location-on" size="lg" />
            <Text bold fontSize={fontSizes.md}>
              {currentDistance.toFixed(2)}km
            </Text>
          </HStack>
          <HStack alignItems="center" space="4px">
            <Icon color="white" as={MaterialIcons} name="access-time" size="lg" />
            <Text bold fontSize={fontSizes.md}>
              {formatDuration({ minutes: duration }, { locale: ptBR, format: ['m', 's'] })}
            </Text>
          </HStack>
        </HStack>
        <Progress value={((initialDistance - currentDistance) / initialDistance) * 100} />
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
    backgroundColor: commonColors.primary[700]
  },
  container: {
    paddingHorizontal: space[4],
    flex: 1
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: -24
  }
})
