import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const TestScreen = () => {
  const handlePress = () => {
    console.log("Pressed!");
  };

  return (
    <View style={styles.container}>
      <Pressable
  style={({ pressed }) => [
    { opacity: pressed ? 0.5 : 1.0 }
  ]}
  onPress={() => console.log('Pressed')}
>
 <View><Text>Press Me</Text></View>
</Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "yellow",
    fontSize: 18,
  },
});

export default TestScreen;
