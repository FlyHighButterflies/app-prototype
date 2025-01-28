import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useSetUserID, useUserID } from "context/UserContext";
import Icon from "react-native-vector-icons/Ionicons";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const userID = useUserID();
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

  console.log(`UserID: ${userID}`);
  console.log(`Response: "${response}"`);

  if (isLoading) {
    return (
      <SafeAreaView style={style.screenContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.screenContainer}>
      <View style={style.loginContainer}>
        <View style={style.loginTitleContainer}>
          <Text style={style.loginTitle}>PiamonTrack</Text>
        </View>

        <View style={style.emailContainer}>
          <Text>Email</Text>
          <TextInput
            style={style.inputContainer}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={style.passwordContainer}>
          <Text>Password</Text>
          <TextInput
            style={style.inputContainer}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          {/* <TouchableOpacity> */}
            <Text style={style.showPasswordIconContainer}>
              <Icon name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} size={30} color="#000" onPress={() => setIsPasswordVisible(!isPasswordVisible)} />
            </Text>
          {/* </TouchableOpacity> */}
        </View>

        <TouchableOpacity style={style.loginButton} onPressOut={handleLogin}>
          <Text style={style.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const style = StyleSheet.create({
  screenContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  loginContainer: {
    width: "100%",
  },
  loginTitleContainer: {
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  // emailContainer: {
  //   borderWidth: 1,
  // },
  passwordContainer: {
    position: "relative",
  },
  inputContainer: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  showPasswordIconContainer: {
    position: "absolute",
    top: 25,
    left: 330,
  },
  loginButton: {
    height: 40,
    borderWidth: 1,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "black",
  },
  loginButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});
