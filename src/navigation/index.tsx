import "@expo/metro-runtime";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { MapScreen } from "../screens/MapScreen/MapScreen";
import Test from "../screens/Test";

export type RootStackParamList = {
  TestScreen: undefined;
  Test: undefined;
};

export type RootNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export const Router = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="TestScreen" component={Test} /> */}
        {/* <Stack.Screen name="Test" component={Test} /> */}
        <Stack.Screen name="TestScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
