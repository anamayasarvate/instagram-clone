import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import firebaseConfig from './firebaseConfig/firebaseConfig';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
// Redux
import store from './store';
import { Provider } from 'react-redux';

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
            component={LandingScreen}
            options={{ headerShown: false }}
          ></stack.Screen>
          <stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ headerShown: true }}
          ></stack.Screen>
        </stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator initialRouteName='Landing'>
          <stack.Screen
            name='Main'
            component={MainScreen}
            options={{ headerShown: false }}
          ></stack.Screen>
          <stack.Screen
            name='Add'
            component={AddScreen}
            options={{ headerShown: true }}
          ></stack.Screen>
          <stack.Screen
            name='Save'
            component={SaveScreen}
            options={{ headerShown: true }}
          ></stack.Screen>
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
