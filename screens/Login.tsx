import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import the GestureHandlerRootView
import Profile from './Profile';
import { HomeStackNavigationProp } from '../type';
import React, { useState } from 'react';


export default function Example() {
    const navigation = useNavigation<HomeStackNavigationProp>()
    const [username, setUsername] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Login
          </Text>
          <Image source={require('../assets/account.png')} alt="logo" style={styles.headerImg} />
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLable}>Enter E-mail / phone number</Text>
            <TextInput
              style={styles.placeholder} 
              placeholder='abc@gmail.com'
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLable}>Enter password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.placeholder} 
              placeholder='**********'
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { username })} style={styles.loginButton}>
            <View style={styles.button}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </View>
          </TouchableOpacity>

        <Text style={styles.orText}>___ Or login with ___</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity>
            <Image source={require('../assets/facebook.png')} alt="facebook" style={styles.socialButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/google.png')} alt="google" style={styles.socialButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/linkedin.png')} alt="linkedin" style={styles.socialButton} />
          </TouchableOpacity>
        </View>

        <Text style={styles.end}>
          New User? <Text style={styles.link}>Create an account</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{
    backgroundColor:'#F5F7F8',
    flex:1
  },
  container: {
    padding: 40,
  },
  header: {
    marginVertical: '20%',
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    color: '#AC87C5',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    marginTop: 25,
  },
  input: {
    marginBottom: 20,
  },
  inputLable: {
    fontSize: 15,
    color: '#AC87C5',
    marginBottom: 2,
  },
  placeholder: {
    borderRadius: 3,
    height: 40,
    backgroundColor:'white',
    borderColor: '#AC87C5',
    borderStyle: 'solid',
    borderWidth: 0.5,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: 150,
    marginVertical: 30,
    margin: 'auto',
  },
  button: {
    backgroundColor: '#756AB6',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  orText: {
    fontSize: 17,
    color: '#756AB6',
    marginVertical: 40,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  socialButton: {
    width: 40,
    height: 40,
  },
  end: {
    textAlign: 'center',
    paddingTop: 20,
    margin:'auto',
    fontSize:18,
    color:'#756AB6'
  },
  link: {
    color: '#CB6040'
  }
});
