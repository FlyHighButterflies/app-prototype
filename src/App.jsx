import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "navigation/AppNavigation";
import DataContext from "context/DataContext";
import UserContext from "context/UserContext";

function App() {
  return (
    <NavigationContainer>
      <UserContext>
        <DataContext>
          <AppNavigation />
        </DataContext>
      </UserContext>
    </NavigationContainer>
  );
}

export default App;