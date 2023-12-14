import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"

const Chat = ({ route, navigation, db, isConnected, storage }) => {
    const [messages, setMessages] = useState([]);
       const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
        console.log(db);
        addDoc(collection(db, "messages"), newMessages[0]);
      }

        const renderBubble = (props) => {
          return <Bubble
            {...props}
            wrapperStyle={{
            right: {
            backgroundColor: "#000"
            },
          left: {
          backgroundColor: "#FFF"
       }
     }}
   />
 }
    const { name, backgroundColor, userID } = route.params;
    
    let unsubMessages;
    
    useEffect(() => {
       setMessages([
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
        },
      ]);
       
        navigation.setOptions({ title: name });
        if (isConnected === true) {
          if (unsubMessages) unsubMessages();
          unsubMessages = null;

          const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
          unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach((doc) => {
              newMessages.push({
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createAt.toMillis()),
              });
            });
            setMessages(newMessages);
          
            
            //const onSend = (newMessages) => {
            //};
            return () => {
              if (unsubMessages) unsubMessages();
            };
          }, [isConnected]);
          
        };
      }, []);

 return (
   <View style={styles.container}>
     <Text>Et tu Barnie?!</Text>
   <GiftedChat
     messages={messages}
     renderBubble={renderBubble}
     onSend={messages => onSend(messages)}
     user={{
       _id: userID,
       name,
     }}
   />

   { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
 </View> 
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;