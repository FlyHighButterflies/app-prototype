import React, { useEffect, useState } from "react";
import {
  Modal,
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

function DeleteExpenseModal({ isDeleting, setIsDeleting, handleDelete }) {
  return (
    <Modal visible={isDeleting} transparent={true}>
      <View style={style.background}>
        <View style={style.container}>
          <View style={style.exitButtonContainer}>
            <TouchableOpacity onPress={() => setIsDeleting(false)}>
              <Text style={style.exitButtonText}>Exit</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Do you really want to delete this item?</Text>
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              style={style.addButton}
              onPress={() => {
                handleDelete();
              }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ExpenseListScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [itemIdToEdit, setItemIdToEdit] = useState(null);
  const userId = useUserID();

  console.log(`ID: ${itemIdToEdit}`);
  console.log(`Item to edit: ${itemToEdit}`);
  console.log(`Deleting state: ${isDeleting}`);

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

  const editExpense = async (expense) => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:8080/api/expenses/${itemIdToEdit}`,
        expense
      );
      if (response.data) {
        setTransactions((prev) =>
          prev.map((item) =>
            item.id === itemIdToEdit ? { ...item, ...expense } : item
          )
        );
      } else {
        console.error("Error: Expected a transaction object");
      }
    } catch (error) {
      console.error(
        "Error editing expense:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error editing expense: ${
          error.response ? error.response.data : error.message
        }`
      );
    }
  };

  const deleteExpense = async () => {
    try {
      if (!itemIdToEdit) {
        console.error("Error: No item ID to delete.");
        return;
      }

      await axios.delete(`http://10.0.2.2:8080/api/expenses/${itemIdToEdit}`);

      setTransactions((prev) =>
        prev.filter((item) => item.id !== itemIdToEdit)
      );
      setIsDeleting(false);
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error deleting expense: ${
          error.response ? error.response.data : error.message
        }`
      );
    }
  };

  return (
    <SafeAreaView style={style.screenContainer}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          style={style.headerBackContainer}
          onPress={() => {
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
        {transactions.map((item) => {
          return (
            <ExpenseItem
              style={style.expenseItemContainer}
              key={item.id}
              id={item.id}
              item={item}
              editable={true}
              setIsEditing={setIsEditing}
              setIsDeleting={setIsDeleting}
              setItemIdToEdit={setItemIdToEdit}
              setItemToEdit={setItemToEdit}
            />
          );
        })}
      </ScrollView>

      <AddEditExpenseModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={editExpense}
        itemToEdit={itemToEdit}
        buttonText={"Save"}
      />
      <DeleteExpenseModal
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        handleDelete={deleteExpense}
      />
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

  background: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    padding: 15,
    width: 300,
    height: 350,
    backgroundColor: "white",
    borderRadius: 10,
  },
  exitButtonContainer: {
    alignItems: "flex-end",
  },
  exitButtonText: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "orange",
    justifyContent: "flex-end",
  },
  addButton: {
    height: 30,
    borderWidth: 1,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default ExpenseListScreen;
