import "@expo/metro-runtime";
import "react-native-gesture-handler";
import React from "react";
import  Router  from "./src/navigation/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";
import 'leaflet/dist/leaflet.css';


export default function App() {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
