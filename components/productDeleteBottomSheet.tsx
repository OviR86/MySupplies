import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import GeneralButton from './generalButton';
import { Colors } from '~/assets/styles';

type ProductDeleteBottomSheetType = {
  productName: string;
  onDelete: (id: string, name: string) => void;
  productId: string;
};

const ProductDeleteBottomSheet = forwardRef<BottomSheetModal, ProductDeleteBottomSheetType>(
  ({ productName, onDelete, productId }, ref) => {
    const snapPoints = useMemo(() => ['35%'], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackgroundProps) => (
        <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
      ),
      []
    );

    const { dismiss } = useBottomSheetModal();
    const closeBottomSheet = () => {
      dismiss();
    };
    return (
      <BottomSheetModal ref={ref} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
        <View style={styles.container}>
          <Text style={styles.question}>Are you sure you want to permanently delete:</Text>
          <Text style={styles.userName}>{productName}</Text>
          <View style={styles.buttonContainer}>
            <GeneralButton
              title="Yes, delete!"
              style={{ backgroundColor: Colors.red }}
              OnPress={() => {
                onDelete(productId, productName);
                closeBottomSheet();
              }}
            />
            <GeneralButton
              title="No, cancel"
              OnPress={() => closeBottomSheet()}
              style={{ width: 160 }}
            />
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default ProductDeleteBottomSheet;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  question: {
    fontSize: 17,
    fontWeight: 'bold',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  userName: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 50,
  },
});
