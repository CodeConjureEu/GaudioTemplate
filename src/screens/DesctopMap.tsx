import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as Location from "expo-location";
import { LocationData, Region } from "../types/mapTypes";
import { locations } from "../constants/locations";
import { Alert } from "react-native";

const DesctopMap = () => {
  const [position, setPosition] = useState([47.1265432, 8.7523298]);

  const [highlightedLocations, setHighlightedLocations] = useState<
    LocationData[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [currentLocation, setCurrentLocation] = useState<number | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  useEffect(() => {
    locationsAction();
  }, []);

  const locationsAction = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        console.log("test:  ", status);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location && location.coords) {
        setCurrentLocation(location.coords.latitude, location.coords.longitude);
        setPosition([location.coords.latitude, location.coords.longitude]);
      } else {
        console.log("Unable to get location coordinates");
      }
    } catch (error) {
      console.error("Error getting location: ", error);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  };

  const showRecommendedLocations = (): void => {
    if (currentLocation) {
      const sortedLocations = [...locations].sort((a, b) => {
        const distanceA = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          a.latitude,
          a.longitude
        );
        const distanceB = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          b.latitude,
          b.longitude
        );
        return distanceA - distanceB;
      });
      setHighlightedLocations(sortedLocations.slice(0, 3));
      if (sortedLocations.length > 0) {
        setPosition([
          sortedLocations[0].latitude,
          sortedLocations[0].longitude,
        ]);
      }
    }
  };

  const handleMarkerPress = (location: LocationData): void => {
    setSelectedLocation(location);
  };

  const guideMe = async (): Promise<void> => {
    if (selectedLocation && currentLocation) {
      const route = [
        [currentLocation.latitude, currentLocation.longitude],
        [selectedLocation.latitude, selectedLocation.longitude],
      ];
      setRouteCoordinates(route);
      setPosition([
        currentLocation.latitude + selectedLocation.latitude / 2,
        currentLocation.longitude + selectedLocation.longitude / 2,
      ]);
    } else {
      Alert.alert(
        "Error",
        "Unable to find current location or selected destination."
      );
    }
  };

  const refresh = (): void => {
    setRouteCoordinates([]);
    setSelectedLocation(null);
  };

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

import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// const MapContainer = (props) => {
//   const mapStyles = {
//     width: '100%',
//     height: '100%',
//   };

//   return (
//     <div style={{ height: '400px', width: '400px' }}>
//       <Map
//         google={props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//           lat: 47.444,
//           lng: -122.176,
//         }}
//       >
//         <Marker position={{ lat: 47.444, lng: -122.176 }} />
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
// })(MapContainer);
