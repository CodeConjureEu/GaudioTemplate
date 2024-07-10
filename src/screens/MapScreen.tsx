import React from "react";
import { StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"

function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Привіт, React Native!</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Моя позначка"
          description="Це опис моєї позначки"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  map: {
    width: "100%",
    height: "80%",
  },
});

export default MapScreen;
