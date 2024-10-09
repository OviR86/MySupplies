import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors, customElevation } from '~/assets/styles';
import useAuthStore from '~/stores/authenticationStore';

const data = [
  { label: 'Admin', value: 'admin' },
  { label: 'Supplier', value: 'supplier' },
  { label: 'Store', value: 'store' },
];

const DropdownComponent = () => {
  const { setRole, role } = useAuthStore();
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === role && (
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
      value={role}
      onChange={(item) => setRole(item.value)}
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
