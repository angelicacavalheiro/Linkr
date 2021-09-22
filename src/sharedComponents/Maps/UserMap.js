import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';
const containerStyle = {
  width: '100%',
  height: '100%'
};


function UserMap({latitude, longitude}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })
  
  const mapRef = useRef(null);

  const [center, setCenter] = useState({lat:0, lng:0})

 setTimeout(() => {
  setCenter({
    lat: Number(latitude),
    lng: Number(longitude)
  });
 }, 500);
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
    mapRef.current = map;
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(UserMap)