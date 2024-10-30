import React, { useState, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login"
import { HomeStackNavigatorParamList } from './type';
import ProfileContent from './screens/Profile';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {setIsLoading(false);}, 2000);}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        {isLoading ? (<Stack.Screen name='Splash' component={Splash} options={{headerShown: false}}/>) 
        : (
          <>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Profile' component={ProfileContent}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
