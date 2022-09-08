import { useNavigation } from '@react-navigation/native'
import { Button, Center, Text, Image } from 'native-base'

export const EventDetails = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <Center flex={1}>
      <Image
        source={require('~assets/logo.png')}
        resizeMode="contain"
        resizeMethod="resize"
        height={24}
        alt="logo"
      />
      <Text textAlign="center">Hello Test2</Text>
      <Text textAlign="center">Event info</Text>
      <Button mt={4}>EventDetails</Button>
      <Button mt={4} onPress={() => navigation.navigate('Home')}>
        Home
      </Button>
      <Button mt={4} onPress={() => navigation.navigate('Search')}>
        EventDetails
      </Button>
      <Button mt={4} onPress={() => navigation.navigate('Navigation')}>
        Navigation
      </Button>
    </Center>
  )
}
