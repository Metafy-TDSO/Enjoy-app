import { MaterialIcons } from '@expo/vector-icons'
import { Icon, IInputProps, Input } from 'native-base'
import { StyleSheet } from 'react-native'

import { commonColors } from '~constants'

interface SearchBarProps extends IInputProps {
  onGoBack: () => void
  value: string
  handleChangeText: (text: string) => void
}

export const SearchBar = ({ onGoBack, handleChangeText, value, ...inputProps }: SearchBarProps) => {
  return (
    <Input
      placeholderTextColor="gray.400"
      variant="unstyled"
      style={styles.searchBar}
      InputLeftElement={
        <Icon
          as={<MaterialIcons name="arrow-back" />}
          color={commonColors.secondary[600]}
          size="16px"
          ml={2}
          onPress={onGoBack}
        />
      }
      InputRightElement={
        <Icon
          as={<MaterialIcons name="highlight-off" />}
          size="16px"
          mr={2}
          color={commonColors.secondary[600]}
          onPress={() => handleChangeText('')}
        />
      }
      placeholder="Ex: festa sleepover, pandora, arena..."
      onChangeText={handleChangeText}
      value={value}
      {...inputProps}
    />
  )
}

const styles = StyleSheet.create({
  searchBar: {
    color: commonColors.lightText,
    backgroundColor: commonColors.black
  }
})
