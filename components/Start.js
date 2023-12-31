import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
import "firebase/auth";
import { Alert } from 'react-native';

const backgroundColors = ["#474056", "#8A95A5", "#B9C6AE", "#090C08"];

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [color, setBackground] = useState(backgroundColors[0]);

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name,
          backgroundColor: color,
        });
        Alert.alert("Signed In!!!");
      })
      .catch((error) => {
        console.error("Error signing in", error);
        Alert.alert("Unable to sign in");
      });
  };

  /* function startChat() {
    navigation.navigate("Chat", {
      name: name,
      color: color,
    });
  }
 */
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-image.png")}
        resizeMode='cover'
        style={styles.flex1}
      >
        <SafeAreaView style={styles.flex1}>
          <View style={[styles.flex1, { justifyContent: "center" }]}>
            <Text style={styles.title}>Chat App</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.textInputContainer}>
              <View style={styles.textInput}>
                <Image
                  style={styles.icon}
                  source={require("../assets/icon.png")}
                />
                <TextInput
                  value={name}
                  style={{ width: "100%", marginLeft: 10 }}
                  onChangeText={setName}
                  placeholder={"Your Name"}
                />
              </View>

              <View style={styles.colorList}>
                {backgroundColors.map((clr, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorCircles,
                      { backgroundColor: clr },
                      color === clr && { borderWidth: 2 },
                    ]}
                    onPress={() => setBackground(clr)}
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Chat", {
                  name: name,
                  backgroundColor: color,
                })
              }
            >
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={signInUser}
              >
                <Text style={styles.button}>Start Chatting</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 40,
    textAlign: "center",
  },
  text: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  box: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  textInputContainer: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  textInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#757083",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
    flexDirection: "row",
  },
  textBackground: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    paddingLeft: 20,
  },
  colorList: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  colorCircles: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 20,
  },
  backgroundContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#757083",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  selected: {
    borderWidth: 1,
    borderColor: "white",
  },
  icon: {
    width: 25,
    height: 25,
  },
});
export default Start;