import { Button, Center, Text, Image } from 'native-base'

export const HomeScreen = (): JSX.Element => {
  // const {
  //   navigation: { navigate }
  // } = props

  // const navigateToDetails = useCallback(() => {
  //   navigate('Details', { id: 'home-id' })
  // }, [navigate])

  return (
    <Center flex={1}>
      <Image
        source={require('~assets/logo.png')}
        resizeMode="contain"
        resizeMethod="resize"
        height={24}
        alt="logo"
      />
      <Text textAlign="center">Hello Test1</Text>
      <Text textAlign="center">Event info</Text>
      <Button mt={4}>Home</Button>
    </Center>
  )
}
