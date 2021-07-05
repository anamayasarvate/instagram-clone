import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import landingScreen from './components/auth/Landing';
import registerScreen from './components/auth/Register';
import firebaseConfig from './firebaseConfig/firebaseConfig';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const stack = createStackNavigator();
export default function App() {
  const [authLoadedData, setAuthLoadedData] = useState({
    loaded: false,
    loggedIn: false,
  });

  const { loaded, loggedIn } = authLoadedData;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setAuthLoadedData({ loaded: true, loggedIn: false });
      } else {
        setAuthLoadedData({ loaded: true, loggedIn: true });
      }
    });
  }, []);
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <stack.Navigator initialRouteName='Landing'>
          <stack.Screen
            name='Landing'
            component={landingScreen}
            options={{ headerShown: false }}
          ></stack.Screen>
          <stack.Screen
            name='Register'
            component={registerScreen}
            options={{ headerShown: true }}
          ></stack.Screen>
        </stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>User is logged in</Text>
    </View>
  );
}
