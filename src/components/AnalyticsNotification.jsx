import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

function AnalyticsNotification() {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={style.notificationContainer}
    >
      <Text style={style.titleText}>Title</Text>
      <Text style={style.messageText}>Message</Text>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  notificationContainer: {
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "white",
  },
  titleText: {
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 12,
  }
});
export default AnalyticsNotification;
