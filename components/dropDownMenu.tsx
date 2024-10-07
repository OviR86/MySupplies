import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors, customElevation } from '~/assets/styles';

const data = [
  { label: 'Admin', value: '1' },
  { label: 'Supplier', value: '2' },
  { label: 'Store', value: '3' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState('');

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={[styles.dropdown, customElevation]}
      placeholderStyle={styles.placeholderStyle}
      containerStyle={{ borderRadius: 30, borderColor: Colors.purpleMid, borderWidth: 1 }}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select user role..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color={Colors.inactiveGray} name="Safety" size={16} />
      )}
      renderItem={renderItem}
      itemContainerStyle={{ borderRadius: 30 }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 12,
    borderColor: Colors.purpleMid,
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.inactiveGray,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
