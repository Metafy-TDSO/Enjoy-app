import { Box, IBoxProps } from 'native-base'

export type AbsoluteProps = Omit<IBoxProps, 'position'>

export const Absolute = (props: AbsoluteProps) => <Box {...props} position="absolute" />
