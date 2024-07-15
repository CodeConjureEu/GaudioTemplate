import { useEffect, useState } from "react";
import { MarkersType, markers } from "../../../constants/markers.constants";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { getDistance } from "../../../utils/helpers";
import fetchRouteData from "../../../../api/GetCoords";

export const useMapScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkersType | null>(
    null
  );
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>();
  const [nearestMarkers, setNearestMarkers] = useState<MarkersType[]>([]);
  const [showNearest, setShowNearest] = useState(false);
  const [routeActive, setRouteActive] = useState(false);
  const [prevSelectedMarker, setPrevSelectedMarker] =
    useState<MarkersType | null>(null);
  const [coords, setCoords] = useState<number[][]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      const userLocation = locationResult.coords;
      setLocation(userLocation);

      const sortedMarkers = markers
        .map((marker) => ({
          ...marker,
          distance: getDistance(
            userLocation.latitude,
            userLocation.longitude,
            marker.latitude,
            marker.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setNearestMarkers(sortedMarkers);
    };

    fetchLocation();
  }, []);

  const onPressAddress = async () => {
    if (selectedMarker) {
      setDestination({
        latitude: selectedMarker.latitude,
        longitude: selectedMarker.longitude,
      });
      setRouteActive(true);
      setPrevSelectedMarker(selectedMarker);
    }
  };

  useEffect(() => {
    const fetchCoords = async () => {
      if (destination) {

        try {
          const newCoords = await fetchRouteData(location, destination);
          setCoords(newCoords);
        } catch (error) {
          console.error("Error fetching COORDS", error);
        }
      }
    };

    fetchCoords();
  }, [destination]);

  const toggleRecommended = () => {
    setShowNearest((prev) => !prev);
  };

  const handleMarkerPress = (marker: MarkersType) => {
    setSelectedMarker(marker);
    if (
      destination &&
      marker.latitude === destination.latitude &&
      marker.longitude === destination.longitude
    ) {
      setRouteActive(true);
    } else if (
      prevSelectedMarker &&
      marker.latitude === prevSelectedMarker.latitude &&
      marker.longitude === prevSelectedMarker.longitude
    ) {
      setRouteActive(true);
    } else {
      setRouteActive(false);
    }
  };

  return {
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
  };
};
