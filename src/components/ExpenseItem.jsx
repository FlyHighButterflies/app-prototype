import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BagIcon from "react-native-vector-icons/MaterialIcons";
import PesoIcon from "react-native-vector-icons/FontAwesome6";
import EditIcon from "react-native-vector-icons/MaterialIcons";
import TrashIcon from "react-native-vector-icons/FontAwesome";

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
    <View style={{ ...style.itemContainer, ...outerStyle }}>
      <View style={style.infoContainer}>
        <View style={style.iconContainer}>
          <BagIcon name={"shopping-bag"} size={24} color={"#800000"} />
        </View>
        <View style={style.textContainer}>
          <Text style={style.categoryText}>{item.category}</Text>
          <Text style={style.descriptionText}>{item.description}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amount}>
            <PesoIcon name={"peso-sign"} size={15} />
            {item.amount}
          </Text>
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
        onPress={() => {
          setItemIdToEdit(id);
          setIsEditing(true);
          setItemToEdit(item);
        }}
      >
        <EditIcon name="edit" size={20} color="green" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsDeleting(true);
          setItemIdToEdit(id);
        }}
      >
        <TrashIcon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  itemContainer: {
    width: 385,
    height: 81,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
  },
  textContainer: {
    marginLeft: 11,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 12,
    color: "#00000080",
  },
  amountContainer: {
    marginLeft: "auto",
    justifyContent: "center",
  },
  amount: {
    fontSize: 17,
    fontWeight: "bold",
  },
  itemModifyContainer: {
    width: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginLeft: 20,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ExpenseItem;
