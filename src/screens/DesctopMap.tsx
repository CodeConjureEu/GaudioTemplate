// import React, { useState, useEffect } from "react";
// import { View, Button, Alert, SafeAreaView } from "react-native";
// import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
// import * as Location from "expo-location";
// import { GlobalStyles } from "../constants";
// import { locations } from "../constants/locations";
// import { LocationData, Region } from "../types/mapTypes";

// export function DesctopMap(props) {
//   const [region, setRegion] = useState<Region>({
//     latitude: 47.1265432,
//     longitude: 8.7523298,
//     latitudeDelta: 0.02,
//     longitudeDelta: 0.02,
//   });

//   const [highlightedLocations, setHighlightedLocations] = useState<
//     LocationData[]
//   >([]);
//   const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
//     null
//   );
//   const [currentLocation, setCurrentLocation] =
//     useState<Location.LocationObjectCoords | null>(null);
//   const [routeCoordinates, setRouteCoordinates] = useState<
//     { latitude: number; longitude: number }[]
//   >([]);

//   const locationsAction = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       if (location && location.coords) {
//         setCurrentLocation(location.coords);
//         setRegion({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         });
//       } else {
//         console.log("Unable to get location coordinates");
//       }
//     } catch (error) {
//       console.error("Error getting location: ", error);
//     }
//   };

//   useEffect(() => {
//     locationsAction();
//   }, []);

//   const calculateDistance = (
//     lat1: number,
//     lon1: number,
//     lat2: number,
//     lon2: number
//   ): number => {
//     const R = 6371e3;
//     const φ1 = (lat1 * Math.PI) / 180;
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const d = R * c;
//     return d;
//   };

//   const showRecommendedLocations = (): void => {
//     const currentLocation = {
//       latitude: region.latitude,
//       longitude: region.longitude,
//     };
//     const sortedLocations = [...locations].sort((a, b): number => {
//       const distanceA = calculateDistance(
//         currentLocation.latitude,
//         currentLocation.longitude,
//         a.latitude,
//         a.longitude
//       );
//       const distanceB = calculateDistance(
//         currentLocation.latitude,
//         currentLocation.longitude,
//         b.latitude,
//         b.longitude
//       );
//       return distanceA - distanceB;
//     });
//     setHighlightedLocations(sortedLocations.slice(0, 3));
//     if (sortedLocations.length > 0) {
//       setRegion({
//         latitude: sortedLocations[0].latitude,
//         longitude: sortedLocations[0].longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     }
//   };

//   const handleMarkerPress = (location: LocationData): void => {
//     setSelectedLocation(location);
//   };

//   const guideMe = async (): Promise<void> => {
//     if (selectedLocation && currentLocation) {
//       const route = [
//         {
//           latitude: currentLocation.latitude,
//           longitude: currentLocation.longitude,
//         },
//         {
//           latitude: selectedLocation.latitude,
//           longitude: selectedLocation.longitude,
//         },
//       ];
//       setRouteCoordinates(route);
//       setRegion({
//         latitude: (currentLocation.latitude + selectedLocation.latitude) / 2,
//         longitude: (currentLocation.longitude + selectedLocation.longitude) / 2,
//         latitudeDelta:
//           Math.abs(currentLocation.latitude - selectedLocation.latitude) * 2,
//         longitudeDelta:
//           Math.abs(currentLocation.longitude - selectedLocation.longitude) * 2,
//       });
//     } else {
//       Alert.alert(
//         "Error",
//         "Unable to find current location or selected destination."
//       );
//     }
//   };

//   const refresh = (): void => {
//     setRouteCoordinates([]);
//     setSelectedLocation(null);
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: GlobalStyles.colors.gray,
//         width: "100%",
//         alignItems: "center",
//       }}
//     >
//       <Map
//         google={props.google}
//         zoom={12}
//         style={GlobalStyles.map}
//         initialCenter={{
//           lat: region.latitude,
//           lng: region.longitude,
//         }}
//         center={{
//           lat: region.latitude,
//           lng: region.longitude,
//         }}
//         onDragend={(mapProps, map) =>
//           setRegion({
//             latitude: map.center.lat(),
//             longitude: map.center.lng(),
//             latitudeDelta: region.latitudeDelta,
//             longitudeDelta: region.longitudeDelta,
//           })
//         }
//       >
//         {locations.map((location, index) => (
//           <Marker
//             key={index}
//             position={{ lat: location.latitude, lng: location.longitude }}
//             title={location.title}
//             onClick={() => handleMarkerPress(location)}
//           />
//         ))}
//         {currentLocation && (
//           <Marker
//             position={{
//               lat: currentLocation.latitude,
//               lng: currentLocation.longitude,
//             }}
//             title="Current Location"
//           />
//         )}
//         {routeCoordinates.length > 0 && (
//           <Polyline
//             path={routeCoordinates.map((coord) => ({
//               lat: coord.latitude,
//               lng: coord.longitude,
//             }))}
//             strokeColor="#000"
//             strokeOpacity={1.0}
//             strokeWeight={6}
//           />
//         )}
//       </Map>
//       <View style={GlobalStyles.recomendButton}>
//         <Button title="Recommended" onPress={showRecommendedLocations} />
//       </View>
//       {selectedLocation && (
//         <View style={GlobalStyles.guideButton}>
//           <Button title="Guide Me" onPress={guideMe} />
//         </View>
//       )}
//       <View style={GlobalStyles.refreshButton}>
//         <Button title="Refresh" onPress={refresh} />
//       </View>
//     </SafeAreaView>
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: YOUR_GOOGLE_MAPS_API_KEY,
// })(DesctopMap);

//! Need to add Google api key

// import React from 'react';
// import { Text} from 'react-native';
// const DesctopMap = () => {
//   return (

//         <>
//           <Text>isPad</Text>
//           <Text>ASGGA</Text>
//         </>
//   );
// };

// export default DesctopMap;

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const DesctopMap = () => {
  const [position, setPosition] = useState([47.444, -122.176]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DesctopMap;
