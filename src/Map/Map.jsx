import React, { useState, Fragment, useEffect } from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import axios from 'axios';

function Map() {
  const [mapRef, setMapRef] = useState(null);
  const [selectedBusker, setSelectedBusker] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [data, setData] = useState(() => {
    axios.get('/people').then((response) => setData(response.data));
});
  const [zoom, setZoom] = useState(5);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA9WCwVPxocNs_WAMQOARzSL08i5NJn8u4'
  });

  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    data.map(busker => {
      bounds.extend({ lat: Number(busker["Coordinates"].split(" ").join().split(",")[2]), lng: Number(busker["Coordinates"].split(" ").join().split(",")[5])});
      return data.id;
    });
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

    if (zoom < 13) {
      setZoom(5);
    }
  };

  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap
          onLoad={loadHandler}
          onClick={e => setClickedLatLng(e.latLng.toJSON())}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            height: "70vh",
            width: "150vh"
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

          {infoOpen && selectedBusker && (
            <InfoWindow
              anchor={markerMap[selectedBusker["ID"]]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>
                <h3>{selectedBusker["Name"]}</h3>
                <div>{selectedBusker["Description"]}</div>
                <div>
                <img className="object-contain h-48 w-full ..." src={selectedBusker["image"]} alt="display image" />
            </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        <h3>
          Center {center.lat}, {center.lng}
        </h3>

        {clickedLatLng && (
          <h3>
            Current Location: {clickedLatLng.lat}, {clickedLatLng.lng}
          </h3>
        )}

        {selectedBusker && <h3>Selected Busker: {selectedBusker["ID"]}<br></br> Location: {selectedBusker["Location"]} <br></br>{selectedBusker["Description"]} <br></br>
        <img className="object-contain h-48 w-full ..." src={selectedBusker["image"]} alt="display image" />
        </h3>}
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default Map;