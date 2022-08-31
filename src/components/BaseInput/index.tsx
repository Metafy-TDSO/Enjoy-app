import { Feather } from '@expo/vector-icons'
import { Input as NBInput, useTheme, Pressable as Touchable, IInputProps } from 'native-base'
import { ComponentProps, forwardRef } from 'react'
import { TextInput } from 'react-native'

import { useSecurePassword } from '~hooks'

export type InputProps = IInputProps & {
  secureTextIconName?: ComponentProps<typeof Feather>['name']
  secureTextIconColor?: string
  secureTextIconSize?: number
}

/**
 * Extended native-base Input component with a secure password icon.
 */
export const Input = forwardRef<TextInput, InputProps>(
  ({ secureTextIconName, secureTextIconColor, secureTextIconSize = 24, ...props }, ref) => {
    const { colors } = useTheme()
    const { securePassword, toggleSecurePassword, iconName } = useSecurePassword(props.type)
    return (
      <NBInput
        {...props}
        value={props.value}
        autoCapitalize="none"
        ref={ref || undefined}
        secureTextEntry={securePassword}
        rightElement={
          props.type === 'password' ? (
            <Touchable mr={2} onPress={toggleSecurePassword}>
              <Feather
                name={secureTextIconName || iconName}
                color={secureTextIconColor || colors.gray['400']}
                size={secureTextIconSize}
              />
            </Touchable>
          ) : (
            props.rightElement
          )
        }
      />
    )
  }
)
