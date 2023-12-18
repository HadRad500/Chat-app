import React, { useEffect } from "react";
import { StyleSheet } from 'react-native';
// import the screens
import Start from './Start';
import Chat from './Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { disableNetwork, enableNetwork } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useDatabase } from "./DatabaseContext";

// Create the navigator
const Stack = createNativeStackNavigator();

const Wrapper = () => {

    const connectionStatus = useNetInfo();
    const { db } = useDatabase();

    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert("Connection lost!!!");
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Start"
            >
                <Stack.Screen
                    name="Start"
                    options={{ headerShown: false }}
                    component={Start}
                />
                <Stack.Screen
                    name="Chat"
                >
                    {props => (
                        <Chat
                            isConnected={connectionStatus.isConnected}
                            {...props}
                        />
                    )}

                </Stack.Screen>
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

export default Wrapper;
