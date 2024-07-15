import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../../constants";
import { PROVIDER_GOOGLE, Marker as MarkerNative } from "react-native-maps";
import { useMapScreen } from "./hook/MapScreen.hook";
import { markers } from "../../constants/markers.constants";
import loadGoogleMapsAPI from "./webMapComponent";
const APIKEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

let MapViewMob: typeof import("react-native-maps").default;
let MapViewDirectionsMob: typeof import("react-native-maps-directions").default;

let MapViewWeb: typeof import("@preflower/react-native-web-maps").default;
let MarkerWeb: typeof import("@preflower/react-native-web-maps").Marker;
let PolylineWeb: typeof import("@preflower/react-native-web-maps").Polyline;

if (Platform.OS === "android" || Platform.OS === "ios") {
  const maps = require("react-native-maps");
  MapViewMob = maps.default;
  MapViewDirectionsMob = require("react-native-maps-directions").default;
}

if (Platform.OS === "web") {
  const mapsWeb = require("@preflower/react-native-web-maps");
  MapViewWeb = mapsWeb.default;
  MarkerWeb = mapsWeb.Marker;
  PolylineWeb = mapsWeb.Polyline;
}

function MapScreen() {
  const {
    showNearest,
    toggleRecommended,
    location,
    nearestMarkers,
    handleMarkerPress,
    destination,
    selectedMarker,
    onPressAddress,
    routeActive,
    coords,
  } = useMapScreen();
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        setGoogleMapsLoaded(true);
      });
    }
  }, [destination]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: showNearest
              ? GlobalStyles.colors.gray500
              : GlobalStyles.colors.gray700,
          },
        ]}
      >
        <TouchableOpacity onPress={toggleRecommended}>
          <Text style={{ color: "white" }}>
            {showNearest ? "Close Recommended" : "Recommended"}
          </Text>
        </TouchableOpacity>
      </View>
      {location &&
        (Platform.OS === "android" || Platform.OS === "ios" ? (
          MapViewMob && MapViewDirectionsMob ? (
            <MapViewMob
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {(showNearest ? nearestMarkers : markers).map((marker, index) => (
                <MarkerNative
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.name}
                  onPress={() => handleMarkerPress(marker)}
                />
              ))}
              {destination && (
                <MapViewDirectionsMob
                  origin={location}
                  destination={destination}
                  apikey={APIKEY!}
                  strokeColor="blue"
                  strokeWidth={4}
                />
              )}
            </MapViewMob>
          ) : null
        ) : googleMapsLoaded && Platform.OS === "web" && MarkerWeb ? (
          <MapViewWeb
            style={styles.map}
            //@ts-ignore
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && (
              <MarkerWeb
                icon={"../../../assets/mapMarker.svg"}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            )}
            {(showNearest ? nearestMarkers : markers).map((marker, index) => (
              <MarkerWeb
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
                onPress={() => handleMarkerPress(marker)}
              />
            ))}
            {destination && PolylineWeb && (
              <PolylineWeb
                coordinates={coords.map((coord) => ({
                  latitude: coord[0],
                  longitude: coord[1],
                }))}
                strokeWidth={8}
                strokeColor="royalblue"
              />
            )}
          </MapViewWeb>
        ) : (
          <></>
        ))}
      <View style={styles.bottomModal}>
        <Text style={styles.title}>{selectedMarker?.name}</Text>
        <View
          style={[styles.buttonContainer, { opacity: routeActive ? 0.6 : 1 }]}
        >
          {selectedMarker && (
            <TouchableOpacity
              onPress={onPressAddress}
              disabled={routeActive}
              style={styles.button}
            >
              <Text style={{ color: "white" }}>Guide Me</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
  map: {
    flex: 1,
    zIndex: 1,
  },
  buttonContainer: {
    backgroundColor: GlobalStyles.colors.gray700,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  bottomModal: {
    flex: 1,
    borderRadius: 20,
    gap: 16,
    padding: 18,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    zIndex: 2,
  },
  button: {
    padding: 14,
    alignItems: "center",
  },
});

export { MapScreen };
