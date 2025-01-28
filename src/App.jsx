import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "navigation/AppNavigation";
import DataContext from "context/DataContext";
import UserContext, { useUserID } from "context/UserContext";
import AuthNavigation from "navigation/AuthNavigation";

function App() {
  return (
    <NavigationContainer>
      <UserContext>
        <DataContext>
          <RootNavigator />
        </DataContext>
      </UserContext>
    </NavigationContainer>
  );
}

function RootNavigator() {
  const userID = useUserID();

  return userID ? <AppNavigation /> : <AuthNavigation />;
}

export default App;