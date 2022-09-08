import { useNavigation } from '@react-navigation/native'
import { Button, Center, Text, Image } from 'native-base'

export const NavigationScreen = (): JSX.Element => {
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
      <Text textAlign="center">Search</Text>
      <Button mt={4} onPress={() => navigation.navigate('Home')}>
        Home
      </Button>
      <Button mt={4} onPress={() => navigation.navigate('EventDetails', { id: 'batata' })}>
        EventDetails
      </Button>
      <Button mt={4} onPress={() => navigation.navigate('Search')}>
        Search
      </Button>
    </Center>
  )
}
