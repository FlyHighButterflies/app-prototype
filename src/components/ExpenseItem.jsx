import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function ExpenseItem({
  style: outerStyle,
  item,
  amount,
  category,
  date,
  editable,
  setIsEditing = null,
}) {
  return (
    <View style={{ ...outerStyle, ...style.itemContainer }}>
      <View style={style.infoContainer}>
        <View>
          <Text>{item}</Text>
          <Text>{category}</Text>
          <Text>{date}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amount}>${amount}</Text>
        </View>
      </View>

      {editable && <EditOptionIcons setIsEditing={setIsEditing} />}
    </View>
  );
}

function EditOptionIcons({ setIsEditing }) {
  return (
    <View style={style.itemModifyContainer}>
      <TouchableOpacity onPressOut={() => setIsEditing(true)}>
        <Text style={{ ...style.optionText, color: "green" }}>E</Text>
      </TouchableOpacity>
      <TouchableOpacity>
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
