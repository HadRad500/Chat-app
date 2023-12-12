import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  TextInput, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
} from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
import "firebase/auth";

const backgroundColors = ["#474056", "#8A95A5", "#B9C6AE", "#090C08"];

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [color, setBackground] = useState(backgroundColors[0]);

  const signInUser = () => {
    signInAnonymously(auth)
    .then ((result) => {
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

export default Start;
      {/* <Text style={styles.appTitle}>Et tu Chat</Text>
      <View style={styles.inputBox}>
        <View style={styles.iconContainer}>
          <Image
          source={require("../assets/icon.png")}
          style={styles.icon}
        />
        </View>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Type your username here'
      />
      <Text
      style={{
        textAlign: "left",
        color: "#757083",
        fontSize: 16,
        fontWeight: "300",
        paddingTop: 15,
        marginLeft: 20,
      }}
      >
        Choose background Color:
      </Text>
      <View style={styles.colorSelector}>
        <TouchableOpacity
        style={[
          styles.colorChoice,
          color === backgroundColors.almostBlack &&
            styles.selectedCircle,
            { backgroundColor: backgroundColors.almostBlack},
        ]}
        onPress={() => setColor(backgroundColors.almostBlack)}
        ></TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.colorChoice,
          color === backgroundColors.darkGray && styles.selectedCircle,
          { backgroundColor: backgroundColors.darkGray },
        ]}
        onPress={() => setColor(backgroundColors.darkGray)}
        ></TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.colorChoice,
          color === backgroundColors.blueGray && styles.selectedCircle,
          { backgroundColor: backgroundColors.blueGray },
        ]}
        onPress={() => setColor(backgroundColors.blueGray)}
        ></TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.colorChoice,
          color === backgroundColors.green && styles.selectedCircle,
          { backgroundColor: backgroundColors.green },
        ]}
        onPress={() => setColor(backgroundColors.green)}
        ></TouchableOpacity>
      </View>
      <Button
        title="Go to ChatRoom"
        onPress={() => navigation.navigate('Chat', {name: name, backgroundColor: color})}
      />
    </View>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: "5%",
  },
  appTitle: {
    fontFamily: "Ariel",
    flex: 2,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 110,
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#ABABAB",
    padding: "5%",
    flexBasis: 125,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    width: "88%",
    borderColor: "#090C08",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    width: "70%",
    marginTop: 0,
    marginBottom: 0,
    padding: 5,
    alignSelf: "center",
  },
});

export default Start; */}