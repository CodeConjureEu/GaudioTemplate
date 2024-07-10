import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  Platform,
} from "react-native";
import { GlobalStyles } from "../../constants";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useMapScreen } from "./hook/MapScreen.hook";
import { markers } from "../../constants/markers.constants";

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
  } = useMapScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          {
            backgroundColor: showNearest
              ? GlobalStyles.colors.gray500
              : GlobalStyles.colors.gray700,
          },
        ]}
      >
        <Button
          title={showNearest ? "Close Recommended" : "Recommended"}
          color="white"
          onPress={toggleRecommended}
        />
      </View>
      {location && (
        <MapView
          style={styles.map}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_GOOGLE
          }
          showsUserLocation
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {(showNearest ? nearestMarkers : markers).map((marker, index) => (
            <Marker
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
            <MapViewDirections
              origin={location}
              destination={destination}
              apikey="AIzaSyDrokXE0yg5KcAFBuPJXuZMcWfJ8mbDoqM"
              strokeColor="blue"
              strokeWidth={4}
            />
          )}
        </MapView>
      )}
      <View style={styles.bottomModal}>
        <Text style={styles.title}>{selectedMarker?.name}</Text>
        <View
          style={[styles.buttonContainer, { opacity: routeActive ? 0.6 : 1 }]}
        >
          {selectedMarker && (
            <Button
              title="Guide Me"
              color="white"
              onPress={onPressAddress}
              disabled={routeActive}
            />
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
    bottom: 30,
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    zIndex: 2,
  },
});

export { MapScreen };
