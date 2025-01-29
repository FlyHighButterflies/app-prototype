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
import LeftArrowIcon from "react-native-vector-icons/FontAwesome6";

function DeleteExpenseModal({ isDeleting, setIsDeleting, handleDelete }) {
  return (
    <Modal visible={isDeleting} transparent={true}>
      <View style={style.background}>
        <View style={style.container}>
          <TouchableOpacity
            style={style.exitButtonContainer}
            onPress={() => setIsDeleting(false)}
          >
            <Text style={style.exitButtonText}>Exit</Text>
          </TouchableOpacity>

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
          style={style.backContainer}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <LeftArrowIcon name={"arrow-left"} size={16} />
        </TouchableOpacity>
        <View>
          <Text style={style.headerText}>Expense List</Text>
        </View>
      </View>
      <ScrollView
        style={style.expenseListOuterContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.expenseListInnerContainer}>
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
        </View>
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
    padding: 25,
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
  },
  backContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderRadius: 999999999,
    backgroundColor: "white",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  expenseListOuterContainer: {
    marginTop: 20,
  },
  expenseListInnerContainer: {
    gap: 10,
  },
  expenseItemContainer: {
    width: 400,
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
