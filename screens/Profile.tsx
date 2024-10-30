import React, { useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';


import List from './List';

const Tab = createBottomTabNavigator();

interface ProfileProps {
    route: RouteProp<{
       Profile: {
          username?: string
      }
  }, 'Profile'>;
  }
  
  function ProfileContent({ route }: ProfileProps) {
    const [username, setUsername] = useState<string>('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState<string>(''); 

    useEffect(() => {
      const { username: routeUsername } = route.params || {};
      if (routeUsername) {
        setUsername(routeUsername);
  
      }
    }, [route.params]);

    const posts = [
        {id: '1', image: require('../assets/post1.jpg')}, 
        {id: '2', image: require('../assets/post2.jpg')},
        {id: '3', image: require('../assets/post3.jpg')},
        {id: '4', image: require('../assets/post2.jpg')},
        {id: '5', image: require('../assets/post3.jpg')},
        {id: '6', image: require('../assets/post1.jpg')},

    ];

    const handleEditProfilePic = () => {
      setModalVisible(true);
    };

    const handleCloseModal = () => {
      setModalVisible(false);
    };

    const handleCameraOption = () => {
      console.log('Camera option selected');
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        console.log(image);
        setImage(image.path);

      });
    };

    const handleGalleryOption = () => {
      console.log('Gallery option selected');
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        setImage(image.path);
      });
    };

    return (
        <View style={styles.container}>
         <View style={styles.profileInfo}>
            <Image 
              source={image ? { uri: image } : require('../assets/profile.jpg')} 
              style={styles.profileImage} 
            />
            <Text style={styles.name}>{username}</Text>
            <TouchableOpacity style={styles.editProfilePicButton} onPress={handleEditProfilePic}>
              <Text style={styles.editProfilePicButtonText}>Edit Profile Pic</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>80</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>80</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>80</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.postsTitle}>Posts</Text>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Image source={item.image} style={styles.postImage} />
            )}
            keyExtractor={item => item.id}
            numColumns={3} 
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalButton} onPress={handleCameraOption}>
                  <Text style={styles.modalButtonText}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleGalleryOption}>
                  <Text style={styles.modalButtonText}>choose from gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={(handleCloseModal)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
    );
}

export default function Profile({ route }: ProfileProps) {
    return (
      <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen 
          name="Profile" component={ProfileContent as React.ComponentType<any> }
          initialParams={route.params}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/profilee.png")}
              />
            ),}}
        />
        <Tab.Screen name="List" component={List} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/list.png")}
            />
          ),}}
      
        />
      </Tab.Navigator>
    </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F8',
    paddingHorizontal: 20,
    paddingTop:40
  },
  header: {
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  statLabel: {
    fontSize: 15,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#FF9900',
    paddingVertical: 10,
    borderRadius: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    justifyContent:'center',
    textAlign:'center',
  },
  postsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: Dimensions.get('window').width / 3 - 30, // Ensures 3 images per row
    height: Dimensions.get('window').width / 3 ,
    borderRadius: 10,
    margin: 5,
  },
  editProfilePicButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  editProfilePicButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FF9900',
    fontSize: 16,
  },
});
