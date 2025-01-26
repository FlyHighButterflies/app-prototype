import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

function TestScreen() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://10.0.2.2:8080/api/users/sign-up", {
          firstName: "Sponge",
          middleName: "C. ",
          lastName: "Bob",
          email: "Sponge.Bob@example.com",
          datetimeCreated: "2024-01-09T10:00:00",
        });

        console.log("Response from sign-up:", res.data);

        const response = await axios.get("http://10.0.2.2:8080/api/users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty array to run only on component mount

  console.log("Data:", data);

  return (
    <SafeAreaView>
      <Text>Hi from Test</Text>
    </SafeAreaView>
  );
}

export default TestScreen;
