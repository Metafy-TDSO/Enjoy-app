import { MaterialIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { Avatar, Box, Container, HStack, Icon, Text, View, VStack } from 'native-base'
import { Dimensions, ImageBackground, StyleSheet, TouchableNativeFeedback } from 'react-native'

import { commonColors, fontSizes } from '~constants'
import { Event, Region } from '~services/models'
import { calcCrow } from '~utils/calcCrow'

export interface EventCardProps {
  event: Event
  currentLocation: Region
  onPress: (id: number) => void
}

const CARD_HEIGHT = 160
const CARD_WIDTH = Dimensions.get('window').width - 70

export const EventCard = ({
  event: { latitude, longitude, id, name, address, startAt, endsAt, imageUrl, creator },
  currentLocation,
  onPress
}: EventCardProps) => {
  return (
    <TouchableNativeFeedback onPress={() => onPress(id)}>
      <Container style={styles.container}>
        <ImageBackground
          source={{ uri: imageUrl }}
          blurRadius={5}
          resizeMode="cover"
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 16 }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: CARD_WIDTH - 16,
              backgroundColor: 'rgba(0,0,0,.3)',
              height: '100%'
            }}
          />
          <HStack style={{ paddingVertical: 8 }}>
            {creator.user.avatarUrl ? (
              <Box flexShrink={1} justifyContent="center">
                <Avatar
                  source={{ uri: creator.user.avatarUrl }}
                  width={fontSizes['2xs']}
                  height={fontSizes['2xs']}
                />
              </Box>
            ) : null}
            <VStack ml={1}>
              <Text bold fontSize={fontSizes['lg']}>
                {name}
              </Text>
              <Text fontSize={fontSizes['md']} color="white">
                {creator.user.name}
              </Text>
            </VStack>
          </HStack>

          <HStack style={{ paddingVertical: 8 }} space="8px">
            <HStack space="6px" alignItems="center">
              <Icon as={<MaterialIcons name="access-time" />} color="white" size="sm" />
              <Text>
                {format(new Date(startAt), 'h')}h - {format(new Date(endsAt), 'h')}h
              </Text>
            </HStack>
            <HStack space="6px" alignItems="center">
              <Icon as={<MaterialIcons name="location-on" />} color="white" size="sm" />
              <Text isTruncated maxW="120px">
                {address}
              </Text>
            </HStack>
            <HStack space="6px" alignItems="center">
              <Icon as={<MaterialIcons name="my-location" />} color="white" size="sm" />
              <Text>
                {calcCrow(latitude, longitude, currentLocation.latitude, currentLocation.longitude).toFixed(
                  1
                )}
                km
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
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderRadius: 16,
    height: '100%',
    borderWidth: 2,
    borderColor: commonColors.secondary[600]
  },
  container: {
    width: CARD_WIDTH,
    borderRadius: 16,
    marginHorizontal: 24,
    height: CARD_HEIGHT
  }
})
