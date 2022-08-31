import { FormControl } from 'native-base'
import { forwardRef, useMemo } from 'react'
import { TextInput } from 'react-native'

import { Input as BaseInput, InputProps } from '../BaseInput'

export type FieldInputProps = InputProps & {
  label?: string
  helperText?: string
  errorMessage?: string
  errorIcon?: JSX.Element
}

const layoutPropsKeys = [
  'm',
  'margin',
  'mt',
  'marginTop',
  'mr',
  'marginRight',
  'mb',
  'marginBottom',
  'ml',
  'marginLeft',
  'mx',
  'my',
  'p',
  'padding',
  'pt',
  'paddingTop',
  'pr',
  'paddingRight',
  'pb',
  'paddingBottom',
  'pl',
  'paddingLeft',
  'px',
  'py'
]

export const Input = forwardRef<TextInput, FieldInputProps>(
  ({ isDisabled, isRequired, isInvalid, label, helperText, errorMessage, ...props }, ref) => {
    const layoutProps = useMemo(
      () => Object.fromEntries(Object.entries(props).filter(([key]) => layoutPropsKeys.includes(key))),
      [props]
    )
    const inputProps = useMemo(
      () => Object.fromEntries(Object.entries(props).filter(([key]) => !layoutPropsKeys.includes(key))),
      [props]
    )

    return (
      <FormControl isRequired={isRequired} isInvalid={isInvalid || Boolean(errorMessage)} {...layoutProps}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <BaseInput {...inputProps} ref={ref} />
        {helperText && <FormControl.HelperText>{helperText}</FormControl.HelperText>}
        {errorMessage && <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>}
      </FormControl>
    )
  }
)
