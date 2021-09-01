import React, { useState, Fragment, useEffect } from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import axios from 'axios';
import useWindowDimensions from "./useWindowDimensions.jsx";
const keys = require('../../env/config');

function Map() {
  const { height, width } = useWindowDimensions();
  const [mapRef, setMapRef] = useState(null);
  const [selectedBusker, setSelectedBusker] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 42.7128, lng: -73.0060 });
  const [data, setData] = useState(() => {
    axios.get('/buskers').then((response) => setData(response.data));
});
  const [zoom, setZoom] = useState(2);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: keys.googleMaps.API
  });

  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    // data.map(busker => {
    //   bounds.extend({ lat: Number(busker["Coordinates"].split(" ").join().split(",")[2]), lng: Number(busker["Coordinates"].split(" ").join().split(",")[5])});
    //   return data.id;
    // });
    map.fitBounds(bounds);
  };

  const loadHandler = map => {
    setMapRef(map);
    fitBounds(map);
  };

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place["ID"]]: marker };
    });
  };

  const markerClickHandler = (event, busker) => {
    setSelectedBusker(busker);
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    if (zoom > 13) {
      setZoom(4);
    }
  };

  const renderMap = () => {
    return (
      <Fragment>
        <div id="map-google" className="w-screen h-full max-h-full overflow-scroll">
        <GoogleMap
          onClick={e => setClickedLatLng(e.latLng.toJSON())}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            height: window.innerHeight - 40,
            width: window.innerWidth
          }}
        >
          {data.map(busker => (
            <Marker
              key={busker["ID"]}
              position={{ lat: Number(busker["Coordinates"].split(" ").join().split(",")[2]), lng: Number(busker["Coordinates"].split(" ").join().split(",")[5])}}
              onLoad={marker => markerLoadHandler(marker, busker)}
              onClick={event => markerClickHandler(event, busker)}
              icon={{
                path:
                "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                fillColor: "#ff4500",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 1.25
              }}
            />
          ))}
      <div className="h-3/4 justify-self-end absolute align-self-center row-start-1 row-end-3">
          {infoOpen && selectedBusker && (
            <InfoWindow
              anchor={markerMap[selectedBusker["ID"]]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>
                <h3>{selectedBusker["Name"]}</h3>
                <hr></hr>
                <div className="h5">{selectedBusker["AudienceorPerformer"]}</div>
                <hr></hr>
                <div>{selectedBusker["Description"]}</div>
                <div>
                <img className="object-contain h-48 w-full ..." src={selectedBusker["image"]} alt="display image" />
            </div>
              </div>
            </InfoWindow>
          )}</div>
        </GoogleMap>
        </div>
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default Map;