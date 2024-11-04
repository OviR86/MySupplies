import { ActivityIndicator, ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import DB from '../db';
import { RecordModel } from 'pocketbase';
import { capitalise } from '../../assets/helpers';
import { Colors } from '~/assets/styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import UserDeleteBottomSheet from '~/components/userDeleteBottomSheet';
import UserCard from '~/components/userCard';
import { router } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';
import CategoryButton from '~/components/categoryButton';

type Section = {
  title: string;
  data: RecordModel[];
};

const groupByRole = (data: RecordModel[]): Section[] => {
  const grouped = data.reduce<Record<string, RecordModel[]>>((acc, user) => {
    const { role } = user;
    if (!acc[role]) acc[role] = [];
    acc[role].push(user);
    return acc;
  }, {});

  return Object.keys(grouped).map((role) => ({
    title: grouped[role].length > 1 ? `${role}s` : role,
    data: grouped[role],
  }));
};

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<RecordModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const uniqueRoles = [...new Set(users.map((user) => user.role))];
  const filterredUsers = selectedRole ? users.filter((user) => user.role === selectedRole) : users;
  const sections: Section[] = groupByRole(filterredUsers);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { setUserName, setEmail, setRole, setId } = useAuthStore();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await DB.collection('users').getFullList();
      setUsers(users);
    } catch (error) {
      console.log('error--->', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const openDeleteSheet = (id: string, name: string) => {
    setSelectedUser({ id, name });
  };

  useEffect(() => {
    if (selectedUser) {
      bottomSheetRef.current?.present();
    }
  }, [selectedUser]);

  const deleteUser = async (id: string, name: string) => {
    try {
      await DB.collection('users').delete(id);
      setUsers(users.filter((user) => user.id !== id));
      alert(`User ${capitalise(name)} deleted`);
    } catch (error) {
      console.log('error--->', JSON.stringify(error, null, 2));
    }
  };

  const handleEditUser = (user: RecordModel) => {
    setId(user.id);
    setUserName(user.username);
    setEmail(user.email);
    setRole(user.role);

    router.push('/editUser');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.purpleMid} />
      ) : (
        <>
          {selectedUser && (
            <UserDeleteBottomSheet
              ref={bottomSheetRef}
              userName={selectedUser.name}
              onDelete={deleteUser}
              userId={selectedUser.id}
            />
          )}
          <Text style={styles.title}>Select user category</Text>
          <ScrollView
            horizontal
            style={{ height: 60, marginBottom: 5 }}
            showsHorizontalScrollIndicator={false}>
            {uniqueRoles.map((role, index) => {
              return (
                <CategoryButton
                  category={role}
                  key={role}
                  onPress={() => setSelectedRole(selectedRole === role ? null : role)}
                  isSelected={selectedRole === role}
                />
              );
            })}
          </ScrollView>
          <SectionList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            sections={sections}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }: { section: Section }) => (
              <Text style={styles.header}>{capitalise(section.title)}</Text>
            )}
            renderItem={({ item }) => (
              <UserCard
                openDeleteSheet={openDeleteSheet}
                item={item}
                onEdit={() => handleEditUser(item)}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 5,
    color: Colors.purpleDark,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
  },
});
