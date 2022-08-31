import { FormControl, Checkbox as NBCheckbox, ICheckboxProps, IFormControlProps } from 'native-base'
import { forwardRef, MutableRefObject } from 'react'

export type FieldCheckboxProps = ICheckboxProps &
  IFormControlProps & {
    label?: string
  }

export const Checkbox = forwardRef<typeof NBCheckbox, FieldCheckboxProps>(
  ({ isInvalid, isRequired, isDisabled, label, ...props }, ref) => {
    return (
      <FormControl isInvalid={isInvalid} isRequired={isRequired} isDisabled={isDisabled}>
        <NBCheckbox ref={ref as MutableRefObject<typeof NBCheckbox>} {...props}>
          {label}
        </NBCheckbox>
      </FormControl>
    )
  }
)
