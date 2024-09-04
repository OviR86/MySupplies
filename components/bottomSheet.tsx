import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

const BottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = useMemo(() => ['60%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  );

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text style={{ fontSize: 60 }}>BottomSheet</Text>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({});
