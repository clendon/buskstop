import React, { useState, Fragment, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import axios from 'axios';
import useWindowDimensions from "./useWindowDimensions.jsx";
const keys = require('../../env/config');

function Map() {
  const [data, setData] = useState(() => {
    axios.get('/buskers').then((response) => setData(response.data));
});
  const [events, setEvents] = useState({});
  const { height, width } = useWindowDimensions();
  const [mapRef, setMapRef] = useState(null);
  const [selectedBusker, setSelectedBusker] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 40.7357, lng: -74.7724 });
  const [zoom, setZoom] = useState(8);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: keys.googleMaps.API,
  });

  useEffect(() => {
    if (!data) {
      axios.get('/buskers').then((response) => setData(response.data));
    }
  });

  const onLoad = React.useCallback(function callback(x) {
    const bounds = new window.google.maps.LatLngBounds();
    x.fitBounds(bounds);
    setMapRef(x)
  }, []);

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

    if (zoom > 15) {
      setZoom(8);
    }
  };

  const renderMap = () => {
    return (
      <Fragment>
        <div id="map-google" className="w-screen h-full max-h-full bg-yellow-600 overflow-scroll">
        <GoogleMap
          onClick={e => setClickedLatLng(e.latLng.toJSON())}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            height: window.innerHeight - 40,
            width: window.innerWidth
          }}
        >
          {data?.map(busker => (
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
            //busker["Events"]?.map(x => (console.log(x)))
          ))}
      <div className="h-3/4 justify-self-end absolute align-self-center row-start-1 row-end-3">
          {infoOpen && selectedBusker && (
            <InfoWindow
              anchor={markerMap[selectedBusker["ID"]]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div className="">
                <h3>{selectedBusker["Name"]}</h3>
                <hr></hr>
                <div className="h5">{selectedBusker["Category"]}</div>
                <hr></hr>
                <div>{selectedBusker["Description"]}</div>
                <div>
                <img className="mx-auto object-contain h-48 w-full ..." src={selectedBusker["image"]} alt="display image" />
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