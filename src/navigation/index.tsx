import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { StatusBar } from "react-native";
import TestScreen from "../screens/TestScreen";

export type RootStackParamList = {
  TestScreen: undefined;
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
        <Stack.Screen name="TestScreen" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
