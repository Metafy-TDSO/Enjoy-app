import { MaterialIcons } from '@expo/vector-icons'
import { Avatar, IAvatarProps, IconButton, IIconButtonProps } from 'native-base'

export interface CloseButtonProps {
  onClose: () => void
  avatarProps?: IAvatarProps
  buttonProps?: IIconButtonProps
}

export const CloseButton = ({ onClose, avatarProps, buttonProps }: CloseButtonProps) => {
  return (
    <Avatar size="44px" _dark={{ backgroundColor: 'black' }} {...avatarProps}>
      <IconButton
        onPress={() => onClose()}
        color="secondary.600"
        as={MaterialIcons}
        name="close"
        {...buttonProps}
      />
    </Avatar>
  )
}
