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
import { useNavigation } from "@react-navigation/native";
import { useSetUserID, useUserID } from "context/UserContext";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const navigation = useNavigation();
  const userID = useUserID();
  const setUserID = useSetUserID();

  async function handleLogin() {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("email", email);

      const res = await axios.post(
        "http://10.0.2.2:8080/api/users/login",
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      setResponse((oldRes) => res.data);

      // if (response === "Login successful!") {
      //   navigation.navigate("Home");
      // }
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
          const res = await axios.get(
            "http://10.0.2.2:8080/api/users"
          );
          const userID = res.data.find(user => user.email === email);
          setUserID(userID.userId);
          navigation.navigate("Home");
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

        <Text>Username</Text>
        <TextInput
          style={style.inputContainer}
          value={email}
          onChangeText={setEmail}
        />
        <Text>Password</Text>
        <TextInput
          style={style.inputContainer}
          value={password}
          onChange={setPassword}
        />

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
  inputContainer: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
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
