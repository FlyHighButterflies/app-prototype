import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import ExpenseItem from "components/ExpenseItem";
import { useUserID } from "context/UserContext";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileIcon from "react-native-vector-icons/FontAwesome";
import BellIcon from "react-native-vector-icons/Ionicons";

function HomeScreen() {
  const [transactions, setTransactions] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budget, setBudget] = useState(8000.0);
  const [balance, setBalance] = useState(budget);
  const [name, setName] = useState("");
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [isAddExpense, setIsAddExpense] = useState(false);
  const userId = useUserID();
  const navigation = useNavigation();
  const d = new Date();
  const day = d.toLocaleString("default", { weekday: "long" });
  const date = d.getDate();
  const month = d.toLocaleString("default", { month: "long" });

  console.log(transactions);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      const total = transactions.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalExpense(total);
      setBalance(budget - total);
      setRecentTransactions(transactions.slice(-10));
    }
  }, [transactions]);

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/users/${userId}`
      );
      if (Array.isArray(response.data.expenses)) {
        setTransactions((prevTransactions) => response.data.expenses);
        setName(response.data.firstName);
        const total = transactions.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalExpense(total);
        setBalance(budget - total);
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
          <View style={style.profileContainer}>
            <View style={style.profileIconContainer}>
              <ProfileIcon name={"user"} size={25} />
            </View>
            <View style={style.profileTextContainer}>
              <Text style={style.welcomeText}>Welcome back!</Text>
              <Text style={style.helloText}>Hello, {name}</Text>
            </View>
            <TouchableHighlight
              style={style.notificationContainer}
              activeOpacity={0.5}
              underlayColor="#80000080"
            >
              <BellIcon name={"notifications"} size={25} color={maroon} />
            </TouchableHighlight>
          </View>
          <View style={style.dateContainer}>
            <Text style={style.dayText}>{day}</Text>
            <Text style={style.dateText}>{`${date} ${month}`}</Text>
          </View>
          <View style={style.moneyContainer}>
            <View style={style.balanceContainer}>
              <Text style={style.balanceText}>Your Balance</Text>
              <Text style={style.balanceAmountText}>P{balance}</Text>
            </View>
            <View style={style.expenseContainer}>
              <Text style={style.expenseText}>Total Expense</Text>
              <Text style={style.expenseAmountText}>
                P{totalExpense.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.transactionsContainer}>
          <View style={style.transactionsTitleContainer}>
            <Text style={style.transactionsTitleText}>
              Today's Transactionsw
            </Text>
            <TouchableOpacity
              style={style.viewAllButton}
              onPress={() => navigation.navigate("ExpenseList")}
            >
              <Text style={style.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={style.transactionsListContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "column-reverse",
            }}
          >
            {recentTransactions.map((item) => {
              return (
                <ExpenseItem
                  style={style.expenseItemContainer}
                  key={item.id}
                  item={item}
                />
              );
            })}
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
    height: 390,
    backgroundColor: maroon,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 1,
    paddingHorizontal: 18,
  },
  profileContainer: {
    marginTop: 37,
    flexDirection: "row",
    alignItems: "center",
  },
  profileIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 9999999,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  profileTextContainer: {
    marginLeft: 8,
  },
  welcomeText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "white",
  },
  helloText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  notificationContainer: {
    width: 35,
    height: 35,
    borderRadius: 9999999,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  dateContainer: {
    width: "100%",
    height: 45,
    alignItems: "flex-end",
  },
  dayText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "rgba(255, 255, 255, 0.6)",
  },
  dateText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
  },
  moneyContainer: {
    flexDirection: "row",
    gap: 11,
    marginTop: 12,
  },
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 199,
    height: 160,
    borderRadius: 10,
    backgroundColor: "#CB7B0C",
  },
  expenseContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 199,
    height: 160,
    borderRadius: 10,
    backgroundColor: "#C4411A",
  },
  balanceText: {
    color: "white",
  },
  balanceAmountText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  expenseText: {
    color: "white",
  },
  expenseAmountText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  transactionsContainer: {
    width: 447,
    height: 600,
    marginTop: -60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ededeb",
    paddingHorizontal: 31,
    paddingTop: 37,
    zIndex: 2,
  },
  transactionsTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
  },
  transactionsTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    height: 33,
    borderRadius: 20,
    backgroundColor: "white",
  },
  viewAllText: {
    fontWeight: "bold",
  },
  transactionsListContainer: {
    marginTop: 10,
  },
  expenseItemContainer: {
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
