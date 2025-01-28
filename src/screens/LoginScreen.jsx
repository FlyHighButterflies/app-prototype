import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import PiamontrackLogo from "../assets/images/PiamonTrackLogo.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useSetUserID, useUserID } from "context/UserContext";
import axios from "axios";

function RealLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const setUserID = useSetUserID();

  async function handleLogin() {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);

      const res = await axios.post(
        "http://10.0.2.2:8080/api/users/login",
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      setResponse(res.data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (response === "Login successful!") {
      const fetchUserID = async () => {
        try {
          const res = await axios.get("http://10.0.2.2:8080/api/users");
          const userID = res.data.find((user) => user.email === email);
          setUserID(userID.userId);
        } catch (err) {
          setError("Failed to fetch user ID");
          console.log("Error fetching user ID:", err.message);
        }
      };

      fetchUserID();
    }
  }, [response]);

  if (isLoading) {
    return (
      <SafeAreaView style={style.screenContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <StatusBar backgroundColor="#800000" />
      <SafeAreaView>
        <View style={style.topFlag}>
          <Image source={PiamontrackLogo} style={style.logo} />
          <Text style={style.screenTitle}>Piamontrack</Text>
        </View>
        <View style={style.mainBackground}>
          <Text style={style.welcomeText}>Welcome Back!</Text>

          <View style={style.emailContainer}>
            <TextInput
              style={style.inputContainer}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </View>

          <View style={style.passwordContainer}>
            <TextInput
              style={style.inputContainer}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholder="Password"
            />
            <Text style={style.showPasswordIconContainer}>
              <Icon
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="#00000080"
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </Text>
          </View>

          <TouchableOpacity>
            <View style={style.forgotPasswordContainer}>
              <Text style={style.forgotPasswordText}>Forgot password?</Text>
            </View>
          </TouchableOpacity>

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
              onPress={() => {
                handleLogin();
              }}
            >
              <Text style={style.logInButtonText}>Log In</Text>
            </TouchableHighlight>
          </LinearGradient>
          <Text style={style.newUserText}>
            New user? <Text style={style.signUpText}>Sign up</Text>
          </Text>
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
    backgroundColor: "white",
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
  gradientBorder: {
    height: 61,
    width: 382,
    borderRadius: 50,
    marginTop: 41,
    padding: 3, // Thickness of the gradient border
  },
  innerButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logInButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: maroon,
  },

  /////////////////
  emailContainer: {
    marginTop: 36,
  },
  inputContainer: {
    width: 382,
    height: 61,
    borderRadius: 50,
    paddingHorizontal: 22,
    paddingVertical: 17,
    backgroundColor: "#E8E8E8",
  },
  passwordContainer: {
    marginTop: 20,
  },
  showPasswordIconContainer: {
    position: "absolute",
    top: 18,
    right: 25,
  },
  forgotPasswordContainer: {
    width: 382,
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 15,
  },
  newUserText: {
    marginTop: 19,
    fontSize: 15,
  },
  signUpText: {
    color: maroon,
  },
});

export default RealLoginScreen;
