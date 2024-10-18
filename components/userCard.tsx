import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RecordModel } from 'pocketbase';
import { Colors, customElevation } from '~/assets/styles';
import { capitalise } from '~/assets/helpers';
import { HeaderButton } from './headerButton';

type UserCardType = {
  item: RecordModel;
  openDeleteSheet: (id: string, userName: string) => void;
  onEdit: () => void;
};

const UserCard = ({ item, openDeleteSheet, onEdit }: UserCardType) => {
  return (
    <View style={[styles.userCard, customElevation]}>
      <View>
        <Text>Role: {capitalise(item.role)}</Text>
        <Text>{item.username}</Text>
        <Text>{item.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <HeaderButton
          name="trash"
          color={Colors.red}
          size={20}
          onPress={() => openDeleteSheet(item.id, item.username)}
        />
        <HeaderButton name="pencil" color={Colors.purpleDark} size={20} onPress={() => onEdit()} />
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    minWidth: '95%',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: 20,
  },
});
