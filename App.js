import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { LogBox, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from "firebase/storage";
import { DatabaseProvider } from "./components/DatabaseContext";
import Wrapper from "./components/Wrapper";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DatabaseProvider>
      <Wrapper />
    </DatabaseProvider>
  );
};

export default App;
