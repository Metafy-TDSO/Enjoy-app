import { MaterialIcons } from '@expo/vector-icons'
import { Avatar, IAvatarProps, IconButton, IIconButtonProps } from 'native-base'

import { commonColors, fontSizes } from '~constants'

export interface CloseButtonProps {
  onClose: () => void
  avatarProps?: IAvatarProps
  buttonProps?: IIconButtonProps
}

export const CloseButton = ({ onClose, avatarProps, buttonProps }: CloseButtonProps) => {
  return (
    <Avatar
      size="44px"
      _dark={{ backgroundColor: 'black', color: commonColors.secondary[500] }}
      {...avatarProps}
    >
      <IconButton
        icon={<MaterialIcons size={fontSizes['xl']} name="close" color={commonColors.secondary[500]} />}
        onPress={() => onClose()}
        {...buttonProps}
      />
    </Avatar>
  )
}
