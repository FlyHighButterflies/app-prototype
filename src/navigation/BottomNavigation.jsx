import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AnalyticsScreen from "screens/AnalyticsScreen";
import HomeScreen from "screens/HomeScreen";

const Tab = createBottomTabNavigator();

function BottomNavigation() {

  return (
    <Tab.Navigator>
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
    </Tab.Navigator>
  );
}

export default BottomNavigation;
