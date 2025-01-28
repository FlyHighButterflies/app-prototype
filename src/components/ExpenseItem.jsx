import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function ExpenseItem({
  style: outerStyle,
  id,
  item,
  editable,
  setIsEditing,
  setIsDeleting,
  setItemIdToEdit,
  setItemToEdit,
}) {
  return (
    <View style={{ ...outerStyle, ...style.itemContainer }}>
      <View style={style.infoContainer}>
        <View>
          <Text>{item.description}</Text>
          <Text>{item.category}</Text>
          <Text>{item.date}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amount}>${item.amount}</Text>
        </View>
      </View>

      {editable && (
        <EditOptionIcons
          id={id}
          item={item}
          setIsEditing={setIsEditing}
          setIsDeleting={setIsDeleting}
          setItemIdToEdit={setItemIdToEdit}
          setItemToEdit={setItemToEdit}
        />
      )}
    </View>
  );
}

function EditOptionIcons({
  id,
  item,
  setIsEditing,
  setIsDeleting,
  setItemIdToEdit,
  setItemToEdit,
}) {
  return (
    <View style={style.itemModifyContainer}>
      <TouchableOpacity
        onPressOut={() => {
          setItemIdToEdit(id);
          setIsEditing(true);
          setItemToEdit(item);
        }}
      >
        <Text style={{ ...style.optionText, color: "green" }}>E</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressOut={() => {
          setIsDeleting(true);
          setItemIdToEdit(id);
        }}
      >
        <Text style={{ ...style.optionText, color: "red" }}>D</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    gap: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
  },
  amountContainer: {
    justifyContent: "center",
  },
  amount: {
    fontWeight: "bold",
  },
  itemModifyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    // borderWidth: 1,
    width: 60,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ExpenseItem;
