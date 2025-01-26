import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function TestScreen() {

  const [data, setData] = useState({});

  useEffect(() => {
    
  }, []);  
  return (
    <SafeAreaView>
      <Text>Hi from Test</Text>
    </SafeAreaView>
  )
}

export default TestScreen