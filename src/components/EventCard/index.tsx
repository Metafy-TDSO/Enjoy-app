import { MaterialIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { Avatar, Container, HStack, Icon, Text, VStack } from 'native-base'
import { ImageBackground, StyleSheet, TouchableNativeFeedback } from 'react-native'

import { fontSizes } from '~constants'
import { Event, Region } from '~services/models'
import { calcCrow } from '~utils/calcCrow'

export interface EventCardProps {
  event: Event
  currentLocation: Region
  onPress: (id: number) => void
}

export const EventCard = ({
  event: { latitude, longitude, id, name, address, startAt, endsAt, imageUrl, creator },
  currentLocation,
  onPress
}: EventCardProps) => {
  return (
    <TouchableNativeFeedback onPress={() => onPress(id)}>
      <Container>
        <ImageBackground
          source={{ uri: imageUrl }}
          blurRadius={5}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <HStack>
            {creator.user.avatarUrl ? (
              <Avatar source={{ uri: creator.user.avatarUrl }} width="28px" height="28px" />
            ) : (
              <></>
            )}
            <VStack ml={1}>
              <Text bold>{name}</Text>
              <Text fontSize={fontSizes['2xs']} color="gray.400">
                {creator.user.name}
              </Text>
              <Text></Text>
            </VStack>
          </HStack>

          <HStack>
            <HStack space="4px">
              <Icon as={<MaterialIcons name="access-time" />} size="sm" />
              <Text>
                {format(startAt, 'h')} - {format(endsAt, 'h')}
              </Text>
            </HStack>
            <HStack space="4px">
              <Icon as={<MaterialIcons name="location-on" />} size="sm" />
              <Text>{address}</Text>
            </HStack>
            <HStack space="4px">
              <Icon as={<MaterialIcons name="my-location" />} size="sm" />
              <Text>
                {calcCrow(latitude, longitude, currentLocation.latitude, currentLocation.longitude)}km
              </Text>
            </HStack>
          </HStack>
        </ImageBackground>
      </Container>
    </TouchableNativeFeedback>
  )
}

export const styles = StyleSheet.create({
  imageBackground: {
    paddingX: '16px',
    paddingY: '8px',
    justifyContent: 'space-between'
  }
})
