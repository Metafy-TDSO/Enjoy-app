import { forwardRef, useCallback } from 'react'
import { Controller, get } from 'react-hook-form'
import { TextInput } from 'react-native'

import { Field } from '~components/Field'

import type { ControlledInputProps, RenderInputProps } from './types'

export const Input = forwardRef<TextInput, ControlledInputProps>(
  ({ control, name, errors, rules, ...props }, ref) => {
    const errorMessage = get(errors, name)?.message

    const renderInput = useCallback(
      ({ field: { onChange, ...fieldProps } }: RenderInputProps) => (
        <Field.Input
          {...props}
          {...fieldProps}
          ref={ref}
          errorMessage={errorMessage}
          onChangeText={onChange}
        />
      ),
      [ref, errorMessage, props]
    )

    return <Controller name={name} control={control} rules={rules} render={renderInput} />
  }
)
