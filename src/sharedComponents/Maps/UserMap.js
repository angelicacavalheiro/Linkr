import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';


function UserMap({latitude, longitude}) {

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat:Number(latitude), 
    lng: Number(longitude)
  }
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      <Marker
        position={center}
      />

      </GoogleMap>
  ) : <></>
}

export default React.memo(UserMap)