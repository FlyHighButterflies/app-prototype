import axios from "axios";
import { useUserID } from "context/UserContext";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SunIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PesoIcon from "react-native-vector-icons/FontAwesome6";
import BellIcon from "react-native-vector-icons/Ionicons";
import { Bar, CartesianChart } from "victory-native";
import roboto from "./Roboto-Regular.ttf";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import SwitchSelector from "react-native-switch-selector";

const DATA = [
  {
    month: 1,
    expense: 1,
  },
  {
    month: 2,
    expense: 2,
  },
  {
    month: 3,
    expense: 3,
  },
  {
    month: 4,
    expense: 2,
  },
  {
    month: 5,
    expense: 2,
  },
  {
    month: 6,
    expense: 2,
  },
  {
    month: 7,
    expense: 2,
  },
  {
    month: 8,
    expense: 2,
  },
  {
    month: 9,
    expense: 2,
  },
  {
    month: 10,
    expense: 2,
  },
  {
    month: 11,
    expense: 2,
  },
  {
    month: 12,
    expense: 2,
  },
];

function DailyExpenseItem({
  id,
  item,
  editable,
  setIsEditing,
  setIsDeleting,
  setItemIdToEdit,
  setItemToEdit,
}) {
  return (
    <View style={style.itemContainer}>
      <View style={style.infoContainer}>
        <View style={style.iconContainer}>
          <SunIcon name={"white-balance-sunny"} size={24} color={"#800000"} />
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

function NewAnalyticsScreen() {
  const myFont = useFont(roboto, 12);
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("weekly");
  const userId = useUserID();

  console.log(transactions);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/users/${userId}`
      );
      if (Array.isArray(response.data.expenses)) {
        setTransactions((prevTransactions) => response.data.expenses);
      } else {
        console.error("Error: Expected an array of transactions");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView>
        <View style={style.dashboardContainer}>
          <View style={style.notificationsContainer}>
            <TouchableHighlight
              style={style.notificationIconContainer}
              activeOpacity={0.5}
              underlayColor="#80000080"
            >
              <BellIcon name={"notifications"} size={25} color={maroon} />
            </TouchableHighlight>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <View style={style.chartNButtonContainer}>
              <View style={style.chartContainer}>
                <CartesianChart
                  data={DATA}
                  xKey="month"
                  yKeys={["expense"]}
                  domain={{ x: [1, 12], y: [0, 10] }}
                  domainPadding={{ left: 15, right: 15 }}
                  padding={10}
                  xAxis={{
                    font: myFont,
                    formatXLabel: (value) => {
                      const date = new Date();
                      date.setMonth(value - 1);
                      const monthName = date.toLocaleString("default", {
                        month: "short",
                      });
                      return monthName;
                    },
                  }}
                >
                  {({ points, chartBounds }) => (
                    <Bar
                      points={points.expense}
                      chartBounds={chartBounds}
                      barWidth={10}
                      roundedCorners={{
                        topLeft: 20,
                        topRight: 20,
                        bottomLeft: 20,
                        bottomRight: 20,
                      }}
                    >
                      <LinearGradient
                        start={vec(0, 0)}
                        end={vec(0, 400)}
                        colors={["#a78bfa", "#a78bfa50"]}
                      />
                    </Bar>
                  )}
                </CartesianChart>
              </View>
              <View style={style.switchSelectorContainer}>
                <SwitchSelector
                  options={[
                    { label: "Weekly", value: "weekly" },
                    { label: "Monthly", value: "monthly" },
                  ]}
                  initial={0}
                  onPress={(value) => setSelectedOption(value)}
                  buttonColor="#CB7B0C" // Active color
                  backgroundColor="white" // Inactive color
                  textColor="black"
                  selectedColor="white"
                  borderRadius={10}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={style.transactionsContainer}>
          <ScrollView
            style={style.transactionsListOuterContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={style.transactionsListInnerContainer}>
              {transactions.map((item) => {
                return <DailyExpenseItem key={item.id} item={item} />;
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const maroon = "#800000";

const style = StyleSheet.create({
  dashboardContainer: {
    width: 447,
    height: 468,
    backgroundColor: maroon,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 1,
    paddingHorizontal: 18,
    paddingTop: 21,
  },
  notificationsContainer: {
    width: 405,
    height: 65,
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    // backgroundColor: "white",
  },
  notificationIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 9999999,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  chartNButtonContainer: {
    borderRadius: 20,
    backgroundColor: "white",
  },
  chartContainer: {
    height: 234,
    width: 391,
    // borderWidth: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  switchSelectorContainer: {
    width: 391,
    // borderWidth: 1,
  },
  transactionsContainer: {
    width: 447,
    height: 521,
    marginTop: -60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ededeb",
    paddingHorizontal: 31,
    paddingTop: 37,
    zIndex: 2,
  },
  transactionsListInnerContainer: {
    gap: 10,
  },
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
});

export default NewAnalyticsScreen;
