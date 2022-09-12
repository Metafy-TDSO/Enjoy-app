import { useMemo } from 'react'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Avatar, Box, HStack, Icon, Text, VStack } from 'native-base'
import automarker from 'automarker'
import { MaterialIcons } from '@expo/vector-icons'

import { Event, Region } from '~services/models'
import { calcCrow } from '~utils/calcCrow'
import { commonColors, fontSizes, space } from '~constants'

export interface ResultProps {
  event: Pick<Event, 'id' | 'name'> & Partial<Omit<Event, 'id' | 'name'>>
  search: string
  currentPosition?: Region
  onPress: (id: number) => void
}

export const Result = ({ event, currentPosition, search, onPress }: ResultProps) => {
  const { id, name, address, imageUrl, latitude, longitude } = event

  const parts = useMemo(() => automarker(name, search), [name, search])
  const distance = useMemo(
    () =>
      currentPosition &&
      latitude &&
      longitude &&
      calcCrow(latitude, longitude, currentPosition.latitude, currentPosition.longitude),
    [currentPosition]
  )

  return (
    <TouchableNativeFeedback onPress={() => onPress(id)}>
      <Box width="100%" borderColor="muted.800" pl={['0', '4']} pr={['0', '5']} py="6px" key={id}>
        <HStack space={[2, 3]}>
          <VStack justifyContent="center" alignItems="center" paddingRight={space['0.5']}>
            {imageUrl ? (
              <Avatar
                size="40px"
                source={{
                  uri: imageUrl
                }}
                style={styles.resultAvatar}
              />
            ) : (
              <Avatar size="40px" backgroundColor="gray.700">
                <Icon as={MaterialIcons} name="access-time" size="sm" color={commonColors.white} />
              </Avatar>
            )}
            {distance ? (
              <Text
                _dark={{
                  color: 'warmGray.50'
                }}
                fontSize={fontSizes.xs}
              >
                {distance.toFixed(2)} km
              </Text>
            ) : null}
          </VStack>
          <VStack justifyContent="center">
            <HStack>
              {parts.map(part => {
                return part.highlight ? <Text bold>{part.text}</Text> : <Text>{part.text}</Text>
              })}
            </HStack>
            <Text fontSize={fontSizes.xs} _dark={{ color: commonColors.subText }}>
              {address}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  resultAvatar: {
    borderWidth: 1,
    borderColor: commonColors.secondary[600]
  }
})
