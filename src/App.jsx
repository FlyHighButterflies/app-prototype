import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "navigation/AppNavigation";
import DataContext from "context/DataContext";

function App() {
  return (
    <NavigationContainer>
      <DataContext>
        <AppNavigation />
      </DataContext>
    </NavigationContainer>
  );
}

export default App;
