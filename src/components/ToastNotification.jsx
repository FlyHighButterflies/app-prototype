import React from "react";
import { Text, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

function ToastNotification() {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={style.notificationContainer}
    >
      <Text style={style.titleText}>Title</Text>
      <Text style={style.messageText}>Message</Text>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  notificationContainer: {
    width: 391,
    height: 65,
    justifyContent: "center",
    position: "absolute",
    top: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "white",
    zIndex: 5,
  },
  titleText: {
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 12,
  },
});

export default ToastNotification;
