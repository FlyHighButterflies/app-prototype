import { useUserID } from "context/UserContext";
import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

function AddEditExpenseModal({ isEditing, setIsEditing, onSave }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const userId = useUserID();

  const handleSave = () => {
    const newExpense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
      user: { userId },
    };
    onSave(newExpense);
    setIsEditing(false);
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <Modal visible={isEditing} transparent={true}>
      <View style={style.background}>
        <View style={style.container}>
          <View style={style.exitButtonContainer}>
            <TouchableOpacity
              onPressOut={() => {
                setIsEditing(false);
              }}
            >
              <Text style={style.exitButtonText}>Exit</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Category</Text>
            <TextInput
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
              style={style.inputContainer}
            />
            <Text>Item</Text>
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={style.inputContainer}
            />
            <Text>Date</Text>
            <TextInput
              placeholder="Date"
              value={date}
              onChangeText={setDate}
              style={style.inputContainer}
            />
            <Text>Amount</Text>
            <TextInput
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={style.inputContainer}
            />
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              style={style.addButton}
              onPress={handleSave}
              onPressOut={() => setIsEditing(false)}
            >
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
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
  inputContainer: {
    borderWidth: 1,
    height: 40,
    padding: 10,
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

export default AddEditExpenseModal;
