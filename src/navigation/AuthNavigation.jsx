import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screens/LoginScreen";

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
