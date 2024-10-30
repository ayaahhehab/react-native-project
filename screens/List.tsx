import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';


const renderItem = ({ item }: { item: any }) => (
  <View style={styles.item}>
    <Image source={{ uri: item.photo }} style={styles.profileImage} />
    <View style={styles.info}>
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text style={styles.username}>Username: {item.username}</Text>
      <Text style={styles.email}>Email: {item.email}</Text>
      <Text style={styles.company}>Company: {item.company}</Text>
      <Text style={styles.address}>
        Address: {item.address}, {item.state}, {item.country}, {item.zip}
      </Text>
      <Text style={styles.phone}>Phone: {item.phone}</Text>
    </View>
  </View>
);

const List = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {fetch('https://fake-json-api.mock.beeceptor.com/users')
      .then((response) => response.json()).then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1254" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  profileImage: {
    width: 130, 
    height: 170,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    paddingTop: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 30,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginLeft: 30,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginLeft: 30,
  },
  company: {
    fontSize: 16,
    color: '#666',
    marginLeft: 30,
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginLeft: 30,
  },
  phone: {
    fontSize: 16,
    color: '#666',
    marginLeft: 30,
  },
  stars: {
    fontSize: 25,
    color: '#3EB489',
    marginLeft: 30,
    paddingTop: 5,
  },
  border: {
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: 'gray', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default List;
