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
          <View style={style.textContainer}>
            <Text style={style.deleteTitleText}>Delete Confirmation</Text>
            <Text>Are you sure you want to delete this item?</Text>
          </View>
          <View style={style.buttonsContainer}>
            <TouchableOpacity style={style.deleteButton} onPress={handleDelete}>
              <Text style={style.buttonsText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.cancelButton}
              onPress={() => setIsDeleting(false)}
            >
              <Text style={style.buttonsText}>Cancel</Text>
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
    gap: 15,
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
    padding: 30,
    width: 350,
    height: 185,
    gap: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textContainer: {
    gap: 5,
  },
  deleteTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    gap: 10,
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#800000",
  },
  cancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
  },
  buttonsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default ExpenseListScreen;
