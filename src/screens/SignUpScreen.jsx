import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setIsLoading(true);
    setResponse("");
    setErrorMessage("");
    const credentials = { firstName, middleName, lastName, email, password };

    try {
      const res = await axios.post(
        "http://10.0.2.2:8080/api/users/sign-up",
        credentials
      );
      setResponse(res.data);
    } catch (err) {
      setErrorMessage(err.response?.data || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  async function createBudget(userId) {
    const defaultBudget = {
      totalBalance: 0,
      totalExpense: 0,
      user: {
        userId
      },
    };

    try {
      const res = await axios.post(
        "http://10.0.2.2:8080/api/budgets",
        defaultBudget
      );
      console.log("Default budget created successfully:", res.data);
    } catch (err) {
      console.log("Error creating budget: ", err);
    }
  }

  useEffect(() => {
    if (response === "Sign-Up successful!") {
      console.log("Created an account");
      const fetchUserID = async () => {
        try {
          const res = await axios.get("http://10.0.2.2:8080/api/users");
          const userID = res.data.find((user) => user.email === email);
          createBudget(userID.userId);
        } catch (err) {
          setError("Failed to fetch user ID");
          console.log("Error fetching user ID:", err.message);
        }
      };

      fetchUserID();
      navigation.navigate("Login");
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
          <Text style={style.createAccountTitle}>Create Account</Text>
        </View>
        <View style={style.mainBackground}>
          <View style={style.firstNameContainer}>
            <Text style={style.labelText}>First Name</Text>
            <TextInput
              style={style.inputContainer}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={style.middleNameContainer}>
            <Text style={style.labelText}>Middle Name</Text>
            <TextInput
              style={style.inputContainer}
              value={middleName}
              onChangeText={setMiddleName}
            />
          </View>

          <View style={style.lastNameContainer}>
            <Text style={style.labelText}>Last Name</Text>
            <TextInput
              style={style.inputContainer}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={style.emailContainer}>
            <Text style={style.labelText}>Email</Text>
            <TextInput
              style={style.inputContainer}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={style.passwordContainer}>
            <Text style={style.labelText}>Password</Text>
            <TextInput
              style={style.inputContainer}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
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

          <TouchableHighlight
            style={{
              ...style.generalButtonStyle,
              ...style.signUpButton,
            }}
            activeOpacity={0.5}
            underlayColor="#80000080"
            onPress={handleSignUp}
          >
            <Text style={style.signUpButtonText}>Sign Up</Text>
          </TouchableHighlight>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={style.haveAccountText}>I already have an account</Text>
          </TouchableOpacity>
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
    paddingVertical: 45,
    paddingHorizontal: 30,
    zIndex: 2,
  },
  createAccountTitle: {
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
  labelText: {
    fontSize: 15,
    marginBottom: 4,
  },
  inputContainer: {
    width: 364,
    height: 45,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: "#E8E8E8",
  },
  firstNameContainer: {
    marginTop: 40,
  },
  middleNameContainer: {
    marginTop: 20,
  },
  lastNameContainer: {
    marginTop: 20,
  },
  emailContainer: {
    marginTop: 20,
  },
  passwordContainer: {
    position: "relative",
    marginTop: 20,
  },
  showPasswordIconContainer: {
    position: "absolute",
    top: 35,
    right: 19,
  },
  signUpButton: {
    width: 364,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 42,
    paddingVertical: 10,
    backgroundColor: maroon,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  haveAccountText: {
    marginTop: 19,
    fontSize: 15,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignUpScreen;
