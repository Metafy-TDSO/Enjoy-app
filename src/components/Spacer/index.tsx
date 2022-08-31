import { Box, Theme } from 'native-base'
import React from 'react'
import { ViewStyle } from 'react-native'

export type SpacingValue = keyof Theme['space']
export type SpacerProps = {
  x?: SpacingValue
  y?: SpacingValue
  flex?: ViewStyle['flex']
}

export const Spacer = React.memo<SpacerProps>(({ x = '0', y = '0', flex }) => (
  <Box mt={y} mr={x} flex={flex} />
))
