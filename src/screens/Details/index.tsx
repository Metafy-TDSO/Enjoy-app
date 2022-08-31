import { useCallback, useMemo } from 'react'
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { Box, Center, Text } from 'native-base'

export const DetailsScreen = (): JSX.Element => {
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  // callbacks
  // const openModal = useCallback(() => {
  //   bottomSheetModalRef.current?.present()
  // }, [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  )

  return (
    <Center>
      {/* <Text>{t('details_screen.title')}</Text> */}
      {/* <Button onPress={openModal}>{t('details_screen.open_bottom_sheet')}</Button> */}
      {/* <Text>{t('details_screen.screen_params', { params: JSON.stringify(params) })}</Text> */}
      <BottomSheetModal
        // ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        <Box p={4}>
          <Text color="black">Detalhes</Text>
        </Box>
      </BottomSheetModal>
    </Center>
  )
}
