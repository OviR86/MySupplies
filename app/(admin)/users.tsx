import { ActivityIndicator, FlatList, SectionList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DB from '../db';
import { RecordModel } from 'pocketbase';
import { capitalise } from '../../assets/helpers';
import { Colors, customElevation } from '~/assets/styles';
import { HeaderButton } from '~/components/headerButton';

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
  const sections: Section[] = groupByRole(users);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await DB.collection('users').getFullList();
      setUsers(users);
      console.log('users--->', JSON.stringify(users, null, 2));
    } catch (error) {
      console.log('error--->', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const userCard = (item: RecordModel) => {
    return (
      <View style={[styles.userCard, customElevation]}>
        <View>
          <Text>Role: {capitalise(item.role)}</Text>
          <Text>{item.username}</Text>
          <Text>{item.email}</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flex: 1,
            paddingRight: 20,
          }}>
          <HeaderButton
            name="trash"
            color={Colors.red}
            size={20}
            onPress={() => {
              deleteUser(item.id, item.username);
            }}
          />
          <HeaderButton
            name="pencil"
            color={Colors.purpleDark}
            size={20}
            onPress={() => {
              editUser(item.id, item.username);
            }}
          />
        </View>
      </View>
    );
  };

  //NOT FINAL FUNCTION. NEED TO CREATE A MODAL TO WARN USER ABOUT DELETING THE USER
  const deleteUser = async (id: string, name: string) => {
    try {
      await DB.collection('users').delete(id);
      setUsers(users.filter((user) => user.id !== id));
      alert(`User ${capitalise(name)} deleted`);
    } catch (error) {
      console.log('error--->', JSON.stringify(error, null, 2));
    }
  };
  //NOT FINAL FUNCTION. NEED TO CREATE A MODAL TO WARN USER ABOUT EDITING THE USER
  const editUser = async (id: string, name: string) => {
    try {
      await DB.collection('users').update(id, { username: name });
      setUsers(users.map((user) => (user.id === id ? { ...user, username: name } : user)));
      alert(`User ${capitalise(name)} updated`);
    } catch (error) {
      console.log('error--->', JSON.stringify(error, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.purpleMid} />
      ) : (
        <>
          <SectionList
            contentContainerStyle={{ paddingBottom: 20 }}
            sections={sections}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }: { section: Section }) => (
              <Text style={styles.header}>{capitalise(section.title)}</Text>
            )}
            renderItem={({ item }) => userCard(item)}
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
  userCard: {
    flexDirection: 'row',
    minWidth: '95%',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
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
