// Function to load Google Maps API
function loadGoogleMapsAPI(callback: () => void) {
  if (window.google && window.google.maps) {
    callback();
  } else {
    const APIKEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}`;
    script.async = true;
    script.defer = true;
    script.onload = callback;

    document.head.appendChild(script);
  }
}

export default loadGoogleMapsAPI;
