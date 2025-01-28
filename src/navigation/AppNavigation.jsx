import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomNavigation";
import ExpenseListScreen from "screens/ExpenseListScreen";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="BottomNavigation">
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExpenseList"
        component={ExpenseListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
