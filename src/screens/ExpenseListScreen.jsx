import React, { useEffect, useState } from "react";
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
import { useUserID } from "context/UserContext";
import axios from "axios";

function ExpenseListScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const userId = useUserID();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/users/${userId}`
      );
      if (Array.isArray(response.data.expenses)) {
        setTransactions(response.data.expenses);
      } else {
        console.error("Error: Expected an array of transactions");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <SafeAreaView style={style.screenContainer}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          style={style.headerBackContainer}
          onPressOut={() => {
            navigation.goBack();
          }}
        >
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
        {transactions.map((item, index) => {
          return (
            <ExpenseItem
              style={style.expenseItemContainer}
              key={index}
              description={item.description}
              amount={item.amount}
              category={item.category}
              date={item.date}
              editable={true}
              setIsEditing={setIsEditing}
            />
          );
        })}
      </ScrollView>

      <AddEditExpenseModal isEditing={isEditing} setIsEditing={setIsEditing} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    padding: 20,
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
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  expenseListContainer: {
    marginTop: 10,
    // borderWidth: 1,
  },
  expenseItemContainer: {
    marginBottom: 10,
    borderRadius: 10,
    // borderWidth: 1,
  },
});

export default ExpenseListScreen;
