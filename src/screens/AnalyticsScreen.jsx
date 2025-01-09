import { LinearGradient, useFont, vec } from "@shopify/react-native-skia"
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bar, CartesianChart } from "victory-native";
import roboto from "./Roboto-Regular.ttf";

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

function AnalyticsScreen({ navigation }) {
  const myFont = useFont(roboto, 12)

  return (
    <SafeAreaView style={style.screenContainer}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          style={style.headerBackContainer}
          onPressOut={() => {
            navigation.goBack();
          }}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={style.headerText}>Analytics</Text>
        </View>
      </View>

      {/* Graph */}
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
      </View>
    </SafeAreaView>
  );
}

const style = {
  screenContainer: {
    padding: 15,
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
  },
  headerBackContainer: {
    borderWidth: 1,
    borderColor: "green",
    marginRight: 20,
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  chartContainer: {
    height: 300,
    width: "100%",
    borderWidth: 1,
  },
};

export default AnalyticsScreen;
