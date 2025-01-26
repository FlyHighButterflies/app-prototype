import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

function AddEditExpenseModal({ isEditing, setIsEditing }) {
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
            <TextInput style={style.inputContainer} />
            <Text>Item</Text>
            <TextInput style={style.inputContainer} />
            <Text>Date</Text>
            <TextInput style={style.inputContainer} />
            <Text>Amount</Text>
            <TextInput style={style.inputContainer} />
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity style={style.addButton} onPressOut={() => setIsEditing(false)}>
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
