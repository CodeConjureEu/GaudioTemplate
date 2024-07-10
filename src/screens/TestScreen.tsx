import React from "react";
import { SafeAreaView } from "react-native";
import { GlobalStyles } from "../constants";

function TestScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: GlobalStyles.colors.gray,
        width: "100%",
        alignItems: "center",
      }}
    >
		</SafeAreaView>
  );
}

export default TestScreen;
