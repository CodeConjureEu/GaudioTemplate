import { Region as MapRegion } from "react-native-maps";

export interface LocationData {
  latitude: number;
  longitude: number;
  title: string;
}

export interface Region extends MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
