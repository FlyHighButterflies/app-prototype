import axios from "axios";
import { useUserID } from "context/UserContext";
import React, { useCallback, useEffect, useState } from "react";
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
// import roboto from "./Roboto-Regular.ttf";
import roboto from "../assets/fonts/Roboto-Regular.ttf";
import { useFont } from "@shopify/react-native-skia";
import SwitchSelector from "react-native-switch-selector";
import { useFocusEffect } from "@react-navigation/native";

function DailyExpenseItem({ item }) {
  const dateObject = new Date(item.date);
  const options = { month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  return (
    <View style={style.itemContainer}>
      <View style={style.infoContainer}>
        <View style={style.iconContainer}>
          <SunIcon name={"white-balance-sunny"} size={24} color={"#800000"} />
        </View>
        <View style={style.textContainer}>
          <Text style={style.dayText}>{item.dayOfWeek}</Text>
          <Text style={style.dateText}>{formattedDate}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amount}>
            <PesoIcon name={"peso-sign"} size={15} />
            {item.dailyExpense}
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
          <Text style={style.monthText}>{item.monthOfYear}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amount}>
            <PesoIcon name={"peso-sign"} size={15} />
            {item.monthlyExpense}
          </Text>
        </View>
      </View>
    </View>
  );
}

function NewAnalyticsScreen() {
  const myFont = useFont(roboto, 12);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("weekly");
  const userId = useUserID();

  useEffect(() => {
    getWeekly();
    getMonthly();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getWeekly();
      getMonthly();
    }, [])
  );

  async function getWeekly() {
    try {
      const res = await axios.get(
        `http://10.0.2.2:8080/api/analytics/weekly/days?userId=${userId}`
      );
      setWeeklyData(res.data);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  async function getMonthly() {
    try {
      const res = await axios.get(
        `http://10.0.2.2:8080/api/analytics/monthly/all?userId=${userId}`
      );
      setMonthlyData(res.data);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

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
                  data={selectedOption === "weekly" ? weeklyData : monthlyData}
                  xKey={
                    selectedOption === "weekly" ? "dayOfWeek" : "monthOfYear"
                  }
                  yKeys={[
                    selectedOption === "weekly"
                      ? "dailyExpense"
                      : "monthlyExpense",
                  ]}
                  domain={{
                    x: [0, selectedOption === "weekly" ? 6 : 11], // Adjusted for weekly (0-6) and monthly (0-11)
                    y: [
                      0,
                      Math.max(
                        ...(selectedOption === "weekly"
                          ? weeklyData.map((d) => d.dailyExpense)
                          : monthlyData.map((d) => d.monthlyExpense)),
                        10
                      ),
                    ],
                  }}
                  domainPadding={{ left: 15, right: 15 }}
                  padding={10}
                  xAxis={{
                    font: myFont,
                    formatXLabel: (value) => {
                      if (selectedOption === "weekly") {
                        const shortDays = {
                          Sunday: "Sun",
                          Monday: "Mon",
                          Tuesday: "Tue",
                          Wednesday: "Wed",
                          Thursday: "Thu",
                          Friday: "Fri",
                          Saturday: "Sat",
                        };
                        return shortDays[value] || value; // Convert full name to short, fallback to original
                      } else {
                        return value.slice(0, 3); // Convert "January" -> "Jan", etc.
                      }
                    },
                    grid: { stroke: "none" },
                  }}
                >
                  {({ points, chartBounds }) => (
                    <Bar
                      points={
                        points[
                          selectedOption === "weekly"
                            ? "dailyExpense"
                            : "monthlyExpense"
                        ]
                      }
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
            {selectedOption === "weekly"
              ? weeklyData.map((item) => (
                  <DailyExpenseItem key={item.dayOfWeek} item={item} />
                ))
              : monthlyData.map((item) => (
                  <MonthlyExpenseItem key={item.monthOfYear} item={item} />
                ))}
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
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
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
