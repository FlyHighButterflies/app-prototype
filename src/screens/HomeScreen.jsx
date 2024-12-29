import React, { cloneitem, useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummyData from "constants/DummyData.json";
import ExpenseItem from "components/ExpenseItem";

function HomeScreen() {
  const [transactions, setTransactions] = useState(dummyData.expenseList);
  const [recentTransactions, setRecentTransactions] = useState(
    transactions.slice(-5)
  );
  const [balance, setBalance] = useState(8000.0);
  const [totalExpense, setTotalExpense] = useState(0.0);

  useEffect(() => {
    const total = transactions.reduce((total, item) => total + item.amount, 0);
    setTotalExpense(prevTotal => total);
    setBalance(prevBalance => 8000 - total)
    setRecentTransactions(transactions.slice(-5));
  }, [transactions]);

  return (
    <SafeAreaView style={style.screenContainer}>
      {/* <ScrollView> */}
      <View style={style.dashboard}>
        <View style={style.balanceContainer}>
          <Text>Total Balance</Text>
          <Text style={style.balanceAmount}>${balance}</Text>
        </View>
        <View style={style.expenseContainer}>
          <Text>Total Expense</Text>
          <Text>${totalExpense}</Text>
        </View>
      </View>
      <View style={style.transactionsContainer}>
        <Text>Recent Transactions</Text>
        <Text>View All</Text>
      </View>
      <View
        style={style.expenseListContainer}
        showsVerticalScrollIndicator={false}
      >
        {recentTransactions.map((item, index) => {
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
        {/* <Text>Hello</Text> */}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    padding: 20,
    // borderWidth: 1,
    height: "100%",
  },
  dashboard: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    // borderWidth: 1,
    borderColor: "green",
  },
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  balanceAmount: {
    fontSize: 25,
  },
  expenseContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  transactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    marginTop: 20,
  },
  expenseListContainer: {
    flexDirection: "column-reverse",
    marginTop: 10,
    // borderWidth: 1,
    borderColor: "red",
  },
  expenseItemContainer: {
    marginTop: 10,
    // borderWidth: 1,
  },
});

export default HomeScreen;
