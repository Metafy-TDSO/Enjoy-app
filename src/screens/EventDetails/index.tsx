import { MaterialIcons } from '@expo/vector-icons'
import { Avatar, Button, Container, Heading, HStack, Icon, ScrollView, Text, VStack } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
/* eslint-disable import/no-duplicates */
import { getDay, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
/* eslint-enable import/no-duplicates */

import { fontSizes, space } from '~constants'
import { CloseButton } from '~components/CloseButton'

export type EventDetailsProps = NativeStackScreenProps<RootStackParamList, 'EventDetails'>

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
  const { event } = route.params

  const handleClose = () => {
    navigation.goBack()
  }

  const handleGoToEvent = () => {
    navigation.navigate('Home', { eventId: event.id })
  }

  return (
    <Container>
      <HStack alignItems="space-between" justifyContent="center" style={styles.stickyHeader}>
        <CloseButton onClose={handleClose} />
        <Avatar size="64px" _dark={{ backgroundColor: 'black', borderColor: 'primary.600' }}>
          <VStack>
            <Text fontWeight={800} fontSize={fontSizes.xl}>
              {getDay(new Date(event.startAt))}
            </Text>
            <Text fontSize={fontSizes.sm}>{format(new Date(event.startAt), 'MMM', { locale: ptBR })}</Text>
          </VStack>
        </Avatar>
      </HStack>
      <ScrollView>
        <VStack space={space[40]}>
          <Heading>{event.name}</Heading>

          <HStack justifyContent="space-between">
            <HStack>
              <Icon as={MaterialIcons} name="location-on" size="sm" />
              <Text>{event.address}</Text>
            </HStack>
            <HStack>
              <Icon as={MaterialIcons} name="access-time" size="sm" />
              <Text>{event.address}</Text>
            </HStack>
          </HStack>

          <Button size="lg" variant="solid" onPress={() => handleGoToEvent()}>
            BORA!
          </Button>

          <VStack space={space[16]}>
            <Heading>Descrição</Heading>
            <Text fontSize={fontSizes.xs}>{event.description}</Text>
          </VStack>
        </VStack>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  stickyHeader: {
    position: 'absolute',
    top: 48,
    width: Dimensions.get('window').width - 32,
    left: 16
  },
  goButton: {
    width: '100%',
    fontWeight: 'bold',
    height: 48
  }
})
