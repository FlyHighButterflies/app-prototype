import { useUserID } from "context/UserContext";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import ExitIcon from "react-native-vector-icons/Feather";
import RadioGroup from "react-native-radio-buttons-group";
import RNPickerSelect from "react-native-picker-select";

function AddEditExpenseModal({
  isEditing,
  setIsEditing,
  onSave,
  itemToEdit,
  setItemToEdit,
  setItemIdToEdit,
  buttonText,
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedId, setSelectedId] = useState("no");
  const radioOptions = [
    { id: "no", label: "No", value: false },
    { id: "yes", label: "Yes", value: true },
  ];
  const selectedRadioValue =
    radioOptions.find((rb) => rb.id === selectedId)?.value || false;
  const [selectedDropDown, setSelectedDropDown] = useState(null);
  const dropDownItems = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];
  const userId = useUserID();

  // console.log(`Selected radio: ${selectedRadioValue}`);
  // console.log(`Selected dropdown: ${selectedDropDown}`);

  useEffect(() => {
    if (itemToEdit) {
      setAmount(itemToEdit.amount || "");
      setCategory(itemToEdit.category || "");
      setDate(itemToEdit.date || "");
      setDescription(itemToEdit.description || "");
    }
  }, [itemToEdit]);

  function handleExit() {
    setIsEditing(false);
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setItemToEdit({});
    setItemIdToEdit(null);
    if(itemToEdit){
      setItemToEdit({});
      setItemIdToEdit(null);
    }
  }

  const handleAddOrEdit = () => {
    const expense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
      user: { userId },
    };
    onSave(expense);
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
            <TouchableOpacity onPress={handleExit}>
              <ExitIcon name="x" size={25} />
            </TouchableOpacity>
          </View>
          <View style={style.allInputsContainer}>
            <View style={style.inputContainer}>
              <Text style={style.inputLabel}>Category</Text>
              <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                style={style.inputField}
              />
            </View>
            <View style={style.inputContainer}>
              <Text style={style.inputLabel}>Item</Text>
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={style.inputField}
              />
            </View>
            <View style={style.inputContainer}>
              <Text style={style.inputLabel}>Date</Text>
              <TextInput
                placeholder="Date"
                value={date}
                onChangeText={setDate}
                style={style.inputField}
              />
            </View>
            <View style={style.inputContainer}>
              <Text style={style.inputLabel}>Amount</Text>
              <TextInput
                placeholder="Amount"
                value={amount.toString()}
                onChangeText={setAmount}
                style={style.inputField}
              />
            </View>
            <View style={style.recurringInputContainer}>
              <View style={style.recurringContainer}>
                <Text style={style.inputLabel}>Recurring</Text>
                <View style={style.radioButtonsContainer}>
                  <RadioGroup
                    radioButtons={radioOptions}
                    onPress={(id) => {
                      setSelectedId(id);
                      if (id === "no") {
                        setSelectedDropDown(null);
                      }
                    }}
                    selectedId={selectedId}
                    layout="row"
                  />
                </View>
              </View>
              <View style={style.frequencyContainer}>
                <Text style={style.inputLabel}>Frequency</Text>
                <View style={style.dropDownBackground}>
                  <RNPickerSelect
                    value={selectedDropDown}
                    onValueChange={setSelectedDropDown}
                    items={dropDownItems}
                    disabled={!selectedRadioValue}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              style={style.addButton}
              onPressOut={() => {
                handleAddOrEdit();
                setIsEditing(false);
              }}
            >
              <Text style={style.buttonText}>{buttonText}</Text>
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
    paddingHorizontal: 25,
    width: 390,
    height: 595,
    backgroundColor: "#ededeb",
    borderRadius: 30,
  },
  exitButtonContainer: {
    alignItems: "flex-end",
  },
  allInputsContainer: {
    width: 340,
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "100%",
    height: 81,
    gap: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputField: {
    borderWidth: 1,
    height: 56,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
  },
  recurringInputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 84,
  },
  recurringContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 3,
    borderColor: "blue",
  },
  radioButtonsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  frequencyContainer: {
    flex: 1.3,
    justifyContent: "center",
    gap: 3,
    borderColor: "green",
  },
  dropDownBackground: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  buttonContainer: {
    width: 340,
    height: 56,
    marginTop: 25,
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#800000",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddEditExpenseModal;
