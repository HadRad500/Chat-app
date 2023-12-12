import React, {useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDyO6fv3sHwoe8LdE6aLyGmZ7AZb4ml7vs",
    authDomain: "chatapp-c569a.firebaseapp.com",
    projectId: "chatapp-c569a",
    storageBucket: "chatapp-c569a.appspot.com",
    messagingSenderId: "928633504290",
    appId: "1:928633504290:web:3af65e27840cba527e007b",
    measurementId: "G-DEDCWESGXP"
  };
  //const connectionStatus = useNetInfo();

  //
  //firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start" options={{headerShown: false}}
        > 
           {props => <Start db={db} {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
