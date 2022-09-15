import { StyleSheet, Dimensions } from 'react-native'
import { Button, Heading, HStack, Icon, Image, Text, View, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format } from 'date-fns'
// eslint-disable-next-line import/default
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import { commonColors, fontSizes, space } from '~constants'
import { CloseButton } from '~components/CloseButton'
import { EventDate } from '~components/EventDate'

export type EventDetailsProps = NativeStackScreenProps<RootStackParamList, 'EventDetails'>

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
  if (!route.params.event) {
    navigation.navigate('Home')
    return null
  }

  const { event } = route.params

  const handleClose = () => {
    navigation.goBack()
  }

  const handleGoToEvent = () => {
    navigation.navigate('Home', { eventId: event.id })
  }

  return (
    <>
      <HStack justifyContent="space-between" style={styles.fixedSection}>
        <CloseButton onClose={handleClose} />
        <EventDate startAt={event.startAt} endAt={event.endsAt} />
      </HStack>
      <ParallaxScrollView
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        renderBackground={() => (
          <View key="background">
            <Image
              source={{
                uri: 'https://img.wallpapersafari.com/phone/640/1136/32/54/5x84kh.jpg',
                width: window.width,
                height: PARALLAX_HEADER_HEIGHT
              }}
              alt="Party background"
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: window.width,
                backgroundColor: 'rgba(0,0,0,.5)',
                height: PARALLAX_HEADER_HEIGHT
              }}
            />
          </View>
        )}
        contentBackgroundColor={commonColors.background}
        contentContainerStyle={styles.content}
      >
        <VStack space={space[3]}>
          <Heading fontSize={fontSizes['4xl']}>{event.name}</Heading>
          <HStack justifyContent="space-between">
            <HStack alignItems="center" space={space['0.5']}>
              <Icon color={commonColors.secondary[600]} as={MaterialIcons} name="location-on" size="lg" />
              <Text fontSize="md" isTruncated maxW={Dimensions.get('window').width / 2 + 40}>
                {event.address}
              </Text>
            </HStack>
            <HStack alignItems="center" space={space['0.5']}>
              <Icon color={commonColors.secondary[600]} as={MaterialIcons} name="access-time" size="lg" />
              <Text fontSize="md">
                {format(new Date(event.startAt), 'h')}h-{format(new Date(event.endsAt), 'h')}h
              </Text>
            </HStack>
          </HStack>
          <Button style={styles.button} size="lg" onPress={() => handleGoToEvent()}>
            BORA!
          </Button>
          <VStack space="xs">
            <Heading>Descrição</Heading>
            <Text fontSize={fontSizes.md}>{event.description}</Text>
          </VStack>
        </VStack>
      </ParallaxScrollView>
    </>
  )
}

const window = Dimensions.get('window')

const PARALLAX_HEADER_HEIGHT = 350
const STICKY_HEADER_HEIGHT = 70

const styles = StyleSheet.create({
  content: {
    paddingVertical: space[8],
    paddingHorizontal: space[8],
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopWidth: 3,
    borderTopColor: commonColors.primary[600]
  },
  goButton: {
    width: '100%',
    fontWeight: 'bold',
    height: 48
  },
  button: {
    backgroundColor: commonColors.primary[700],
    borderRadius: 50,
    fontWeight: 700
  },
  fixedSection: {
    position: 'absolute',
    top: 40,
    width: Dimensions.get('window').width - 32,
    left: 16,
    zIndex: 99999
  }
})
