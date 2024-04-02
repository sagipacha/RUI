import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const defaultMapConfig = {
  gestureHandling: "greedy",
  options: {
    fullscreenControl: false,
  },
  mapContainerStyle: {
    height: "100vh",
    width: "100%",
  },
};

export default function SimpleMap({setCords}) {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 32.132775,
    lng: 34.807206,
  });

  const handleMarkerDragEnd = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };
  setCords(markerPosition)
  return (
    <>
      <LoadScript
        googleMapsApiKey={"AIzaSyDlVB8LIqI6S-4meNmfe4MLoEnYl5wKjio"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div />}
        mapElement={<div />}>
        <GoogleMap
          {...defaultMapConfig}
          center={{ lat: 32.132775, lng: 34.807206 }}
          zoom={16}>
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
}
