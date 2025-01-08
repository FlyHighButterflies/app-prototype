import React, { useState, useEffect } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseItem from "components/ExpenseItem";
import { useData } from "context/DataContext";

function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState(useData());
  const [recentTransactions, setRecentTransactions] = useState(
    transactions.slice(-5)
  );
  const [budget, setBudget] = useState(8000.0);
  const [balance, setBalance] = useState(budget);
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [isAddExpense, setIsAddExpense] = useState(false);

  useEffect(() => {
    const total = transactions.reduce((total, item) => total + item.amount, 0);
    setTotalExpense(total);
    setBalance(8000 - total);
    setRecentTransactions(transactions.slice(-8));
  }, [transactions]);

  return (
    <SafeAreaView style={style.screenContainer}>
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
      <TouchableOpacity
        style={style.addExpenseButton}
        onPressOut={() => {
          setIsAddExpense(true);
        }}
      >
        <Text style={{ color: 'white'}}>Add Expense</Text>
      </TouchableOpacity>
      <Modal visible={isAddExpense} transparent={true}>
        <View style={style.addExpenseModalBackground}>
          <View style={style.addExpenseModalContainer}>
            <View style={style.addExpenseModalExitContainer}>
              <TouchableOpacity
                onPressOut={() => {
                  setIsAddExpense(false);
                }}
              >
                <Text style={style.addExpenseModalExitText}>Exit</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Category</Text>
              <TextInput style={style.addExpenseInputContainer} />
              <Text>Item</Text>
              <TextInput style={style.addExpenseInputContainer} />
              <Text>Date</Text>
              <TextInput style={style.addExpenseInputContainer} />
              <Text>Amount</Text>
              <TextInput style={style.addExpenseInputContainer} />
            </View>
            <View style={style.addExpenseModalButtonContainer}>
              <TouchableOpacity style={style.addExpenseButton}>
                <Text style={{ color: 'white'}}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={style.transactionsContainer}>
        <Text>Recent Transactions</Text>
        <TouchableOpacity
          style={style.viewContainer}
          onPressOut={() => navigation.navigate("ExpenseList")}
        >
          <Text>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={style.expenseListContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "column-reverse",
        }}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    padding: 15,
    borderWidth: 1,
    height: "100%",
  },
  dashboard: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    backgroundColor: "rgba(0, 255, 0, 0.3)",
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
  addExpenseButton: {
    height: 30,
    borderWidth: 1,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "green",
  },
  addExpenseModalBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  addExpenseModalContainer: {
    padding: 15,
    width: 300,
    height: 350,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addExpenseModalExitContainer: {
    alignItems: "flex-end",
  },
  addExpenseModalExitText: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  addExpenseInputContainer: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  addExpenseModalButtonContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "orange",
    justifyContent: "flex-end",
  },
  transactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    marginTop: 15,
  },
  viewContainer: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  expenseListContainer: {
    marginTop: 10,
    // borderWidth: 1,
    borderColor: "red",
  },
  expenseItemContainer: {
    marginBottom: 10,
    borderRadius: 10,
    // borderWidth: 1,
  },
});

export default HomeScreen;
