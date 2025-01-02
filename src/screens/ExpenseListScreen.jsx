import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummyData from "constants/DummyData.json";
import ExpenseItem from "components/ExpenseItem";

function ExpenseListScreen({ navigation }) {
  return (
    <SafeAreaView style={style.screenContainer}>
      <View style={style.headerContainer}>
        <TouchableOpacity style={style.headerBackContainer} onPressOut={() => {navigation.goBack()}}>
          <Text>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={style.headerText}>Expense List</Text>
        </View>
      </View>
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
    padding: 15,
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "red", 
  },
  headerBackContainer: {
    borderWidth: 1,
    borderColor: "green",
    marginRight: 20,
    justifyContent: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  expenseListContainer: {
    // borderWidth: 1,
  },
  expenseItemContainer: {
    marginTop: 10,
    // borderWidth: 1,
  },
});

export default ExpenseListScreen;
