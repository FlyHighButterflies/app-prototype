import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AnalyticsScreen from "screens/AnalyticsScreen";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import TestScreen from "screens/TestScreen";

const Tab = createBottomTabNavigator();

function BottomNavigation() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;