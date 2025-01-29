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
import MoonIcon from "react-native-vector-icons/Ionicons";
import PesoIcon from "react-native-vector-icons/FontAwesome6";
import BellIcon from "react-native-vector-icons/Ionicons";
import { Bar, CartesianChart } from "victory-native";
import roboto from "./Roboto-Regular.ttf";
import { useFont } from "@shopify/react-native-skia";
import SwitchSelector from "react-native-switch-selector";

const DATA = [
  { day: 0, expense: 0 }, // Sunday
  { day: 1, expense: 0 }, // Monday
  { day: 2, expense: 0 }, // Tuesday
  { day: 3, expense: 10 }, // Wednesday (Highest)
  { day: 4, expense: 0 }, // Thursday
  { day: 5, expense: 0 }, // Friday
  { day: 6, expense: 0 }, // Saturday
];

function DailyExpenseItem({ item }) {
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
    </View>
  );
}

function MonthlyExpenseItem({ item }) {
  return (
    <View style={style.itemContainer}>
      <View style={style.infoContainer}>
        <View style={style.iconContainer}>
          <MoonIcon name={"moon-sharp"} size={24} color={"#800000"} />
        </View>
        <View style={style.textContainer}>
          <Text style={style.categoryText}>{item.category}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amount}>
            <PesoIcon name={"peso-sign"} size={15} />
            {item.amount}
          </Text>
        </View>
      </View>
    </View>
  );
}

function NewAnalyticsScreen() {
  const myFont = useFont(roboto, 12);
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("weekly");
  const userId = useUserID();

  useEffect(() => {
    fetchExpenses();
    async function getDaily() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8080/api/analytics/daily?userId=${userId}`
        );
        console.log(`Data: ${res.data}`);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }
    getDaily();
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
                  xKey="day"
                  yKeys={["expense"]}
                  domain={{ x: [0, 6], y: [0, 10] }}
                  domainPadding={{ left: 15, right: 15 }}
                  padding={10}
                  xAxis={{
                    font: myFont,
                    formatXLabel: (value) => {
                      const days = [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                      ];
                      return days[value];
                    },
                    grid: { stroke: "transparent" },
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
                      color="#800000"
                    />
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
                  buttonColor="#CB7B0C"
                  backgroundColor="white"
                  textColor="#800000"
                  selectedColor="white"
                  borderRadius={10}
                  textStyle={{ fontWeight: "bold" }}
                  selectedTextStyle={{ fontWeight: "bold" }}
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
            {/* <View style={style.transactionsListInnerContainer}> */}
            {transactions.map((item) => {
              return <MonthlyExpenseItem key={item.id} item={item} />;
            })}
            {/* </View> */}
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
    height: 465,
    marginTop: -60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ededeb",
    paddingHorizontal: 31,
    paddingTop: 37,
    zIndex: 2,
  },
  transactionsListInnerContainer: {
    gap: 15,
  },
  itemContainer: {
    width: 385,
    height: 81,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 20,
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
