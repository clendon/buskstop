import React, { useState } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import config from '../../env/config';

const MainMap = ({setNewCoord, setMapOpen, google, latLngOG}) => {

  const [marker, setMarker] = useState({
    title: '',
    name: '',
    position: {
      lat: null,
      lng: null,
    },
  });
  // changes coordinates to be submitted to the coordinates of the current marker on map
  const changeCoord = (e) => {
    const latt = marker.position.lat;
    const long = marker.position.lat;
    if (latt === null && long === null) {
      alert('Please select a location');
    } else {
      setNewCoord(marker.position);
      setMapOpen(false);
    }
  };
  // places marker on map when map is clicked
  const onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarker(
      {
        title: '',
        name: '',
        position: { lat, lng },
      },
    );
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
      <button type="button" onClick={(e) => changeCoord(e)} className="text-center fixed bottom-0 z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Location</button>
      <Map
        google={google}
        style={{ width: '100%', margin: 'auto' }}
        className="map"
        zoom={13}
        onClick={onClick}
        initialCenter={{
          lat: latLngOG.lat,
          lng: latLngOG.lng,
        }}
      >
        <Marker
          title={marker.title}
          name={marker.name}
          position={marker.position}
        />
      </Map>
    </div>
  );
}

const MapModal = GoogleApiWrapper({
  apiKey: (config.googleMaps.API),
})(MainMap);

export default MapModal;
