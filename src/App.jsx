import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import HomeScreen from './screens/HomeScreen'
import ExpenseListScreen from 'screens/ExpenseListScreen'
import TestScreen from 'screens/TestScreen'

function App() {
  return (
    <SafeAreaProvider>
        <HomeScreen />
        {/* <ExpenseListScreen /> */}
    </SafeAreaProvider>
  )
}

export default App