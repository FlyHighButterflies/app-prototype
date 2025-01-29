import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AnalyticsScreen from "screens/AnalyticsScreen";
import HomeScreen from "screens/HomeScreen";
import NewAnalyticsScreen from "screens/NewAnalyticsScreen";
import HomeIcon from "react-native-vector-icons/Feather";
import AnalyticsIcon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const ICON_COLOR = "#800000";
const ICON_SIZE = 25;

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "Home") {
            return <HomeIcon name="home" size={ICON_SIZE} color={ICON_COLOR} />;
          } else if (route.name === "Analytics") {
            return (
              <AnalyticsIcon
                name="analytics-outline"
                size={ICON_SIZE}
                color={ICON_COLOR}
              />
            );
          }
          return null;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: ICON_COLOR,
        tabBarInactiveTintColor: ICON_COLOR,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="FakeAnalytics" component={AnalyticsScreen} /> */}
      <Tab.Screen name="Analytics" component={NewAnalyticsScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
