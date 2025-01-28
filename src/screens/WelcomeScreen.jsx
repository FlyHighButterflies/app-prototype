import React, { useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import PiamontrackLogo from "../assets/images/PiamonTrackLogo.png";

function WelcomeScreen() {
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  return (
    <View>
      <StatusBar backgroundColor="#800000" />
      <SafeAreaView>
        <View style={style.topFlag}>
          <Image source={PiamontrackLogo} style={style.logo} />
          <Text style={style.screenTitle}>Piamontrack</Text>
        </View>
        <View style={style.mainBackground}>
          <Text style={style.welcomeText}>Welcome!</Text>
          <TouchableHighlight
            style={{
              ...style.generalButtonStyle,
              ...style.createAccountButton,
            }}
            activeOpacity={0.5}
            underlayColor="#80000080"
            onPress={() => console.log("Create Account Pressed")}
          >
            <Text style={style.createAccountButtonText}>Create Account</Text>
          </TouchableHighlight>
          <LinearGradient
            colors={["#800000", "#DAA520"]}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[style.gradientBorder, isLoginPressed && { opacity: 0.5 }]}
          >
            <TouchableHighlight
              style={style.innerButton}
              underlayColor="white"
              activeOpacity={0.5}
              onPressIn={() => {
                setIsLoginPressed(true);
              }}
              onPressOut={() => {
                setIsLoginPressed(false);
              }}
              onPress={() => console.log("Login Pressed")}
            >
              <Text style={style.logInButtonText}>Log In</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </View>
  );
}

const maroon = "#800000";

const style = StyleSheet.create({
  topFlag: {
    width: 448,
    height: 272,
    backgroundColor: maroon,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 27,
    paddingHorizontal: 70,
    zIndex: 2,
  },
  logo: {
    width: 91,
    height: 91,
    borderRadius: 9999999,
  },
  screenTitle: {
    textTransform: "uppercase",
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  mainBackground: {
    width: 448,
    height: 746,
    alignItems: "center",
    marginTop: "-45",
    zIndex: 1,
    paddingVertical: 45,
    paddingHorizontal: 32,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 102,
  },
  generalButtonStyle: {
    height: 61,
    width: 382,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
  },
  createAccountButton: {
    marginTop: 44,
    backgroundColor: maroon,
  },
  createAccountButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  logInButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: maroon,
  },
  gradientBorder: {
    height: 61,
    width: 382,
    borderRadius: 50,
    marginTop: 20,
    padding: 3, // Thickness of the gradient border
  },
  innerButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
