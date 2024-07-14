import { locations } from "../../constants/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDistance } from "geolib";
import { GlobalStyles, ICoordinate, ILocation } from "../../constants";
import * as Location from "expo-location";
import MapView, { Callout, Marker, CalloutSubview } from "react-native-maps";
import { DefaultButton } from "../../components";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import openMap, { createMapLink, createOpenLink } from "react-native-open-maps";

export const useData = () => {
  const [recommendedLocations, setRecommendedLocations] = useState<
    ({ distance: number } & ILocation)[]
  >([]);
  const [userCoordinate, setUserCoordinate] = useState<ICoordinate>({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [destination, setDestination] = useState<ICoordinate>({
    latitude: 0.0,
    longitude: 0.0,
  });

  const mapRef = useRef<MapView>();

  const renderMarkers = useCallback(
    (coordiantes: ILocation[]) =>
      coordiantes.map((location: ILocation) => (
        <Marker
          key={location.name}
          coordinate={location.coordiante}
          pinColor={
            recommendedLocations.length > 0
              ? GlobalStyles.colors.skyBlue
              : GlobalStyles.colors.vividTangelo
          }
        >
          <Callout
            tooltip
            onPress={() => {
              handlePressGuide(location.coordiante);
            }}
          >
            <View style={s.callout}>
              <Text
                style={[
                  GlobalStyles.text.screenSubtitle,
                  { textAlign: "center" },
                ]}
              >
                {location.name}
              </Text>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 40,
                }}
              >
                <DefaultButton
                  label="Guid"
                  handlePress={() => {
                    handlePressGuide(location.coordiante);
                  }}
                />
              </View>
              <CalloutSubview
                onPress={() =>
                  openMap({
                    latitude: location.coordiante.latitude,
                    longitude: location.coordiante.longitude,
                    provider: "google",
                  })
                }
                style={{
                  alignSelf: "center",
                  width: "100%",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: 0,
                }}
              >
                <DefaultButton
                  label="Open web map"
                  handlePress={() => {
                    openMap({
                      latitude: location.coordiante.latitude,
                      longitude: location.coordiante.longitude,
                      provider: "google",
                    });
                  }}
                />
              </CalloutSubview>
            </View>
          </Callout>
        </Marker>
      )),
    [recommendedLocations]
  );
  const handlePressGuide = useCallback((coordiante: ICoordinate) => {
    setDestination(coordiante);
  }, []);
  const handlePressRecommended = useCallback(() => {
    const data =
      userCoordinate.latitude > 1 &&
      locations.map((loc: ILocation) => {
        return {
          ...loc,
          distance: getDistance({ ...userCoordinate }, { ...loc.coordiante }),
        };
      });

    if (data && data.filter((loc) => loc.distance <= 5000).length >= 3) {
      setRecommendedLocations(
        data.sort((a, b) => b.distance - a.distance).slice(0, 3)
      );
      mapRef.current?.animateToRegion({
        ...data[0].coordiante,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  }, [userCoordinate]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      await Location.getCurrentPositionAsync({}).then((RES) =>
        setUserCoordinate(RES.coords)
      );
    })();
  }, []);

  return {
    userCoordinate,
    destination,
    setRecommendedLocations,
    handlePressRecommended,
    recommendedLocations,
    mapRef,
    renderMarkers,
  };
};
const s = StyleSheet.create({
  callout: {
    backgroundColor: "white",
    width: 220,
    height: 140,
    flexDirection: "column",
    alignItems: "stretch",
    gap: 5,
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 12,
  },
});
