import "@expo/metro-runtime";
import "react-native-gesture-handler";

import React from "react";
import { Router } from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadScript } from "@preflower/react-native-web-maps";
import { registerRootComponent } from "expo";

export default function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDrokXE0yg5KcAFBuPJXuZMcWfJ8mbDoqM">
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </LoadScript>
  );
}

registerRootComponent(App);
