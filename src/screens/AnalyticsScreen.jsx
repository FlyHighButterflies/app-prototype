import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function AnalyticsScreen() {
  return (
    <SafeAreaView style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
      <Text>Hello from Analytics Screen</Text>
    </SafeAreaView>
  );
}

export default AnalyticsScreen