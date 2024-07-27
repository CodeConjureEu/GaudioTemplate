import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { StatusBar } from "react-native";
import MapRoute from "../screens/MapRoute";

export type RootStackParamList = {
  TestScreen: undefined;
};

export type RootNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

 const Router = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MapRoute" component={MapRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router
