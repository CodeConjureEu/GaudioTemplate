import React from "react";
import { Platform } from "react-native";
import  DesctopMap  from "./DesctopMap";
import  MapScreen  from "./MapScreen";

 function MapRoute() {
  if (Platform.OS === "android" | "ios" ) {
    return <MapScreen />;
  } else {
    return <DesctopMap />;
  }
}

export default MapRoute