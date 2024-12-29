import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummyData from "constants/DummyData.json";
import ExpenseItem from "components/ExpenseItem";

function ExpenseListScreen() {
  return (
    <SafeAreaView style={style.screenContainer}>
      <ScrollView
        style={style.expenseListContainer}
        showsVerticalScrollIndicator={false}
      >
        {dummyData.expenseList.map((item, index) => {
          return (
            <ExpenseItem
              style={style.expenseItemContainer}
              key={index}
              item={item.item}
              amount={item.amount}
              category={item.category}
              date={item.date}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    height: "100%",
    // padding: 20,
  },
  expenseListContainer: {
    padding: 10,
    borderWidth: 1,
  },
  expenseItemContainer: {
    marginTop: 10,
    borderWidth: 1,
  },
});

export default ExpenseListScreen;
