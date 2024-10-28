import { ActivityIndicator, SectionList, StyleSheet, Text, View } from 'react-native';
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
  const sections: Section[] = groupByRole(users);
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

    router.push('/(admin)/editUser');
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
