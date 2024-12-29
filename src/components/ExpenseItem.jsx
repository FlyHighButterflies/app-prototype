import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ExpenseItem({ style: outerStyle, item, amount, category, date }) {
  return (
    <View style={{ ...outerStyle, ...style.itemContainer }}>
      <View>
        <Text>{item}</Text>
        <Text>{category}</Text>
        <Text>{date}</Text>
      </View>
      <View style={style.amountContainer}>
        <Text>${amount}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  amountContainer: {
    justifyContent: "center",
  },
});

export default ExpenseItem;
