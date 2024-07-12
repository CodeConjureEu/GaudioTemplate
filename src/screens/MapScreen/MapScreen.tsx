import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { GlobalStyles, locations } from "../../constants";
import { View } from "react-native";
import { DefaultButton } from "../../components";
import { useData } from "./useData";
export const MapScreen = () => {
  const {
    handlePressRecommended,
    recommendedLocations,
    mapRef,
    userCoordinate,
    destination,
    renderMarkers,
  } = useData();

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        zoomEnabled
        followsUserLocation
        showsMyLocationButton
        showsUserLocation
        style={{ height: "100%", width: "100%" }}
        provider="google"
        initialRegion={{
          ...locations[0].coordiante,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        <MapViewDirections
          origin={userCoordinate}
          destination={destination}
          strokeColor={GlobalStyles.colors.vividTangelo}
          strokeWidth={2}
          //      (ADD_API_KEY)
          apikey="AIzaSyBmHRIc9XbXcobx49624IzwgseEBK2NjVM"
        />
        {renderMarkers(
          recommendedLocations.length <= 0 ? locations : recommendedLocations
        )}
      </MapView>
      <View style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
        <DefaultButton
          label="Recommended"
          handlePress={handlePressRecommended}
        />
      </View>
    </View>
  );
};
