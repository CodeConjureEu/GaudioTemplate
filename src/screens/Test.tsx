import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

const Test = () => {
  const nav = useNavigation();

  return (
    <View>
      <Text>ewqe</Text>
      <Button title="dwqewq" onPress={() => nav.navigate("TestScreen")} />
    </View>
  );
};

export default Test;
