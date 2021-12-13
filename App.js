import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/auth/login'
import RegisterScreen from './components/auth/register'
import SplashScreen from './components/auth/splash'
import MainScreen from './components/Main'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store =createStore(rootReducer,applyMiddleware(thunk))

import  firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCUO-CStXuflU3bqCXtgJoVYwNXzBmpNW8",
  authDomain: "app1-a22fe.firebaseapp.com",
  projectId: "app1-a22fe",
  storageBucket: "app1-a22fe.appspot.com",
  messagingSenderId: "268705494557",
  appId: "1:268705494557:web:dbae2d1309f22b99b0b8f4"
};

// Initialize Firebase
if (firebase.apps?.length === 0){
  firebase.initializeApp(firebaseConfig)
}


const Stack = createNativeStackNavigator()
 export default function App() {
  return (
    <Provider store={store}>
       <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
      <Stack.Screen name='Splash' component={SplashScreen}  ></Stack.Screen>
        <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen> 
        <Stack.Screen name="Register" component={RegisterScreen} ></Stack.Screen>
        <Stack.Screen name="Main" component={MainScreen} ></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

    </Provider>
   
  )}