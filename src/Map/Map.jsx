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
  const [events, setEvents] = useState([]);
  const [eventLabels, setEventLabels] = useState([]);
  const { height, width } = useWindowDimensions();
  const [mapRef, setMapRef] = useState(null);
  const [selectedBusker, setSelectedBusker] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [eventMap, setEventMap] = useState({});
  const [center, setCenter] = useState({ lat: 40.7357, lng: -74.7724 });
  const [zoom, setZoom] = useState(8);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: keys.googleMaps.API,
  });

  useEffect(() => {
    if (!data) {
      axios.get('/buskers').then((response) => setData(response.data));
      // axios.get('/buskers/Shrek/events').then((response) => setEvents(response.data));
    }
    if (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i]["Events"].length > 0) {
          events[data[i]["Name"]] = data[i]["Events"];
          if(eventLabels.indexOf(data[i]["Name"]) === -1){
            eventLabels.push(data[i]["Name"]);
          }
        }
      }
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

  const eventLoadHandler = (event, place) => {
    return setEventMap(prevState => {
      return { ...prevState, [place["_id"]]: event };
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

  const eventClickHandler = (event, busker) => {
    setSelectedEvent(busker);
    if (eventOpen) {
      setEventOpen(false);
    }

    setEventOpen(true);

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
                fillColor: "#d97706",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 1.25
              }}
            />
            //busker["Events"]?.map(x => (console.log(x)))
          ))}
          {eventLabels?.map(label => (events[label]?.map(event => (
            <Marker
              key={event["_id"]}
              position={{ lat: Number(event["coordinates"].split(" ").join().split(",")[2]), lng: Number(event["coordinates"].split(" ").join().split(",")[5])}}
              onLoad={marker => eventLoadHandler(marker, event)}
              onClick={e => eventClickHandler(e, event)}
              icon={{
                fillColor: "#d97706",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 1.25
              }}
            />
          ))))}
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
      <div className="h-3/4 justify-self-end absolute align-self-center row-start-1 row-end-3">
          {eventOpen && selectedEvent && (
            <InfoWindow
              anchor={eventMap[selectedEvent["_id"]]}
              onCloseClick={() => setEventOpen(false)}
            >
              <div className="">
                <h3>{selectedEvent["location"]}</h3>
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