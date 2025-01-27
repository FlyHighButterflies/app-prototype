import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseItem from "components/ExpenseItem";
import AddEditExpenseModal from "components/AddEditExpenseModal";
import axios from "axios";
import { useUserID } from "context/UserContext";

function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budget, setBudget] = useState(8000.0);
  const [balance, setBalance] = useState(budget);
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [isAddExpense, setIsAddExpense] = useState(false);
  const userId = useUserID();

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      const total = transactions.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalExpense(total);
      setBalance(budget - total);
      setRecentTransactions(transactions.slice(-10));
    }
  }, [transactions]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8080/api/users/${userId}`);
      if (Array.isArray(response.data.expenses)) {
        setTransactions(prevTransactions => response.data.expenses);
        const total = transactions.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalExpense(total);
        setBalance(budget - total);
      } else {
        console.error("Error: Expected an array of transactions");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8080/api/expenses",
        expense
      );
      if (response.data) {
        const newTransactions = [...transactions, response.data];
        setTransactions(newTransactions);
        const total = newTransactions.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalExpense(total);
        setBalance(budget - total);
        setRecentTransactions(newTransactions.slice(-8));
      } else {
        console.error("Error: Expected a transaction object");
      }
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error adding expense: ${
          error.response ? error.response.data : error.message
        }`
      );
    }
  };

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
        <Text>Add Expense</Text>
      </TouchableOpacity>

      <AddEditExpenseModal
        isEditing={isAddExpense}
        setIsEditing={setIsAddExpense}
        onSave={addExpense}
      />

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
              description={item.description}
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
    padding: 20,
    borderWidth: 1,
    height: "100%",
  },
  dashboard: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
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
  },
  transactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
