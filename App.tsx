import "@expo/metro-runtime";
import "react-native-gesture-handler";
import React from "react";
import { Router } from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";

export default function App() {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
