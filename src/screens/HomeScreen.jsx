import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import ExpenseItem from "components/ExpenseItem";
import { useUserID } from "context/UserContext";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileIcon from "react-native-vector-icons/FontAwesome";
import BellIcon from "react-native-vector-icons/Ionicons";
import EditBudgetIcon from "react-native-vector-icons/AntDesign";
import ExitIcon from "react-native-vector-icons/Feather";

function EditBudgetModal({ isVisible, setIsVisible }) {
  const [money, setMoney] = useState("")
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={style.background}>
        <View style={style.container}>
          <View style={style.exitBudgetModalContainer}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <ExitIcon name="x" size={25} />
            </TouchableOpacity>
            <View style={style.inputContainer}>
              <Text style={style.inputLabel}>Your Budget</Text>
              <TextInput
                placeholder="10000"
                value={money}
                onChangeText={setMoney}
                style={style.inputField}
              />
            </View>
            <View style={style.setBudgetButtonContainer}>
              <TouchableOpacity
                style={style.setBudgetButton}
                onPressOut={() => {
                  console.log("Setting budget");
                }}
              >
                <Text style={style.setBudgetButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function HomeScreen() {
  const [transactions, setTransactions] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budget, setBudget] = useState(8000.0);
  const [balance, setBalance] = useState(budget);
  const [name, setName] = useState("");
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [isAddExpense, setIsAddExpense] = useState(false);
  const [isEditBudget, setIsEditBudget] = useState(true);
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
              <TouchableOpacity onPress={() => setIsEditBudget(true)} style={style.editBudgetIcon}>
                <EditBudgetIcon name="edit" color="white" size={24} />
              </TouchableOpacity>
            </View>
            <View style={style.expenseContainer}>
              <Text style={style.expenseText}>Total Expense</Text>
              <Text style={style.expenseAmountText}>P{totalExpense}</Text>
            </View>
          </View>
        </View>
        <EditBudgetModal
          isVisible={isEditBudget}
          setIsVisible={setIsEditBudget}
        />
        <View style={style.transactionsContainer}>
          <View style={style.transactionsTitleContainer}>
            <Text style={style.transactionsTitleText}>
              Today's Transactions
            </Text>
            <TouchableOpacity
              style={style.viewAllButton}
              onPress={() => navigation.navigate("ExpenseList")}
            >
              <Text style={style.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={style.transactionsListOuterContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "column-reverse",
            }}
          >
            <View style={style.transactionsListInnerContainer}>
              {recentTransactions.map((item) => {
                return (
                  <ExpenseItem
                    style={style.expenseItemContainer}
                    key={item.id}
                    item={item}
                  />
                );
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
    position: "relative",
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
  editBudgetIcon: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  expenseText: {
    color: "white",
  },
  expenseAmountText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
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
    height: 230,
    backgroundColor: "#ededeb",
    borderRadius: 30,
  },
  exitBudgetModalContainer: {
    alignItems: "flex-end",
  },
  inputContainer: {
    width: "100%",
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
  setBudgetButtonContainer: {
    width: 340,
    height: 56,
    marginTop: 25,
  },
  setBudgetButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#800000",
  },
  setBudgetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
  transactionsListOuterContainer: {
    marginTop: 20,
  },
  transactionsListInnerContainer: {
    gap: 10,
  },
});

export default HomeScreen;
