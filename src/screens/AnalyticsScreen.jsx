import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bar, CartesianChart } from "victory-native";
import roboto from "./Roboto-Regular.ttf";
import { useEffect, useState } from "react";
import { useData } from "context/DataContext";
import { useUserID } from "context/UserContext";
import axios from "axios";
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

function CategoryItem({ style: outerStyle, category, amount }) {
  return (
    <View style={{ ...outerStyle, ...style.itemContainer }}>
      <View style={style.infoContainer}>
        <View>
          <Text>{category}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amount}>${amount}</Text>
        </View>
      </View>
    </View>
  );
}

function AnalyticsScreen() {
  const myFont = useFont(roboto, 12);
  const [transactions, setTransactions] = useState([]);
  const [dataByCategory, setDataByCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState("weekly");
  const userId = useUserID();
  
  useEffect(() => {
    fetchExpenses();
    // const byCategory = transactions.reduce((finalObject, transaction) => {
    //   const { category, amount } = transaction;

    //   if (!finalObject[category]) {
    //     finalObject[category] = { total: 0, transactions: [] };
    //   }

    //   finalObject[category].total += amount;
    //   finalObject[category].transactions.push(transaction);
    //   return finalObject;
    // }, {});

    // setDataByCategory(byCategory);
  }, [transactions]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/users/${userId}`
      );
      if (Array.isArray(response.data.expenses)) {
        setTransactions(response.data.expenses);
      } else {
        console.error("Error: Expected an array of transactions");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // console.log(dataByCategory);

  return (
    <SafeAreaView style={style.screenContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
      >
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
        <View style={{ width:391, borderWidth: 1, }}>
          <SwitchSelector
            options={[
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
            ]}
            initial={0}
            onPress={(value) => setSelectedOption(value)}
            buttonColor="#007AFF" // Active color
            backgroundColor="#EFEreFEF" // Inactive color
            textColor="#000"
            selectedColor="#FFF"
            borderRadius={10}
          />
        </View>
      </View>

      <ScrollView
        style={style.categoryItemListContainer}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(dataByCategory).map(([key, value]) => {
          return (
            <CategoryItem
              key={key}
              style={style.categoryItemContainer}
              category={key}
              amount={value.total}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = {
  screenContainer: {
    padding: 15,
    height: "100%",
  },
  chartContainer: {
    height: 234,
    width: 391,
    borderWidth: 1,
  },
  // itemContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   height: "50",
  //   padding: 10,
  //   paddingHorizontal: "20",
  //   borderWidth: 1,
  //   gap: 20,
  // },
  // infoContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  // amountContainer: {
  //   justifyContent: "center",
  // },
  // categoryItemListContainer: {
  //   marginTop: 20,
  // },
  // categoryItemContainer: {
  //   marginBottom: 10,
  //   borderRadius: 10,
  // },
};

export default AnalyticsScreen;