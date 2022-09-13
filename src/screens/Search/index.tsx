import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Box, FlatList, Divider, Center, Spinner, Text } from 'native-base'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useQuery } from 'react-query'
import { debounce } from 'debounce'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Result } from '~components/Result'
import { ASYNC_STORAGE_KEYS, commonColors, space } from '~constants'
import { getManyEvents } from '~services/api'
import { Event } from '~services/models'
import { SearchBar } from '~components/SearchBar'

export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>

export const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
  const currentLocation = route.params.currentLocation

  const [search, setSearch] = useState<string>('')
  const { getItem: getRecentSearchesStorage, setItem: setRecentSearchesStorage } = useAsyncStorage(
    ASYNC_STORAGE_KEYS.RECENT_SEARCHES
  )
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const { data, isLoading, refetch } = useQuery(
    ['searchResults'],
    () => getManyEvents({ ...currentLocation, name: search }),
    { enabled: false }
  )

  useEffect(() => {
    getRecentSearchesStorage((_error, previousRecentSearches) => {
      setRecentSearches(JSON.parse(previousRecentSearches ?? '[]'))
    })
  }, [])

  const addRecentSearch = async () => {
    if (search.length < 3) return

    const previousRecentSearches = await getRecentSearchesStorage()
    const result = Array.from(new Set([search, ...JSON.parse(previousRecentSearches ?? '[]')])).slice(0, 3)

    setRecentSearchesStorage(JSON.stringify(result))
    setRecentSearches(result)
  }

  const handleGoBack = () => {
    navigation.navigate('Home')
  }

  const handlePressResult = async (event: Event) => {
    await addRecentSearch()
    navigation.navigate('EventDetails', { event })
  }

  const filteredDispatch = (): void => {
    refetch()
  }
  const debouncedSearch = useCallback(debounce(filteredDispatch, 300), [])

  const updateSearch = (value: string): void => {
    setSearch(value)
    if (search.length > 3) debouncedSearch()
  }

  const handlePressRecentSearch = (value: string): void => {
    setSearch(value)
    refetch()
  }

  return (
    <Container paddingX={4} paddingTop={12}>
      <Box style={styles.searchContainer}>
        <SearchBar onGoBack={handleGoBack} value={search} handleChangeText={updateSearch} />
      </Box>
      {(!data?.events || data?.events.length === 0) && search === '' ? (
        <FlatList
          style={styles.resultList}
          data={recentSearches}
          ItemSeparatorComponent={() => <Divider marginBottom={space[0.5]} />}
          renderItem={({ item, index: key }) => (
            <Result
              key={key}
              onPress={() => handlePressRecentSearch(item)}
              event={{ name: item, id: key }}
              search={search}
            />
          )}
        />
      ) : null}
      {isLoading ? (
        <Center width="100%" style={styles.resultList}>
          <Spinner size="lg" />
        </Center>
      ) : null}
      {data?.events.length === 0 && search !== '' ? (
        <Center width="100%" style={styles.resultList}>
          <Text>Nenhum resultado encontrado</Text>
        </Center>
      ) : null}
      {search.length > 3 && data?.events && data.events.length > 0 ? (
        <FlatList
          style={styles.resultList}
          data={data?.events}
          ItemSeparatorComponent={() => <Divider marginBottom={space[0.5]} />}
          renderItem={({ item }) => (
            <Result
              currentPosition={currentLocation}
              event={item}
              search={search}
              onPress={id => {
                const pressedEvent = data.events.find(event => event.id === id)
                if (pressedEvent) handlePressResult(pressedEvent)
              }}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      ) : null}
    </Container>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    width: Dimensions.get('window').width - 36,
    backgroundColor: commonColors.black,
    borderWidth: 1,
    borderColor: commonColors.secondary[600],
    borderRadius: 8,
    marginBottom: space[2]
  },
  resultList: {
    marginTop: space[2],
    width: Dimensions.get('window').width - 36,
    height: Dimensions.get('window').height - 200
  }
})
