/* eslint-disable import/no-duplicates */
import { getDay, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, Text, VStack } from 'native-base'
import { StyleSheet } from 'react-native'

import { commonColors, fontSizes } from '~constants'

export interface EventDateProps {
  startAt: string | Date
  endAt: string | Date
}

export const EventDate = ({ endAt, startAt }: EventDateProps) => (
  <Avatar size="64px" style={styles.avatar}>
    <VStack alignItems="center">
      <Text fontWeight={800} fontSize={fontSizes.xl}>
        {getDay(new Date(startAt))}
      </Text>
      <Text fontSize={fontSizes.sm}>{format(new Date(endAt), 'MMM', { locale: ptBR })}</Text>
    </VStack>
  </Avatar>
)

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: commonColors.background,
    borderWidth: 1,
    borderColor: commonColors.primary[600]
  }
})
