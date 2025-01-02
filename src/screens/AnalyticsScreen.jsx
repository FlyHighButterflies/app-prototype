import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartesianChart, Line } from "victory-native";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

function AnalyticsScreen({ navigation }) {
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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ height: 300, width: "100%" }}>
          <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
            {({ points }) => (
              <Line points={points.highTmp} color="red" strokeWidth={3} />
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
};

export default AnalyticsScreen;
