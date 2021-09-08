import React, { useState, useEffect } from 'react';
import config from '../../../env/config.js';
import ClosingAlert from './Alert.jsx';
import axios from 'axios';
import Form from './Form.jsx';

const NewPerformance = ({latLng, profile, getBuskerProfile, createAlert, setShowAlert}) => {
  const performances = [1, 2, 3];
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(null);
  const [newCoord, setNewCoord] = useState(null);
  const [streetAddress, setStreetAddress] = useState(null);


  const newEvent = {
    location: streetAddress,
    coordinates: `{ lat: ${newCoord?.lat}, lng: ${newCoord?.lng} }`,
    date: time,
  };

  //clears data when modal closed
  const clearSelections = () => {
    setTime(null);
    setNewCoord(null);
    setShowModal(false);
  };

  //retrieves street address of chosen location
  const getStreetAddress = () => {
    if(newCoord) {
      const configStreetAdd = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newCoord.lat},${newCoord.lng}&key=${config.googleMaps.API}`,
        headers: { },
      };

      console.log(configStreetAdd);

      axios(configStreetAdd)
        .then((response) => {
          setStreetAddress(response.data.results[0].formatted_address);
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }

  const createNewEvent = () => {

    //creates event if proper info selected
    if(newCoord !== null && time !== null && streetAddress !== null) {
      let data = JSON.stringify(newEvent);

      console.log(data)

      let configPost = {
        method: 'post',
        url: `https://buskstop.herokuapp.com/${profile.Name}/events`,
        headers: {
          'Content-Type': 'application/json',
        },
        data : data
      };

      axios(configPost)
      .then((response) => {
        getBuskerProfile()
        createAlert('Event Created');
      })
      .catch((error) => {
        alert(error);
      });
      setShowModal(false)

    }
    //warns user of missing info for event
      var output = ''
      if (newCoord === null) {
        output+= 'Please choose a location\n'
      }
      if (time === null) {
        output+= 'Please choose a time\n'
      }
      createAlert(output)
      //alert(output)
  }

  useEffect(() => {
    getStreetAddress();

  }, [newCoord]);

  return (
    <>
      <div className="flex flex-col justify-center items-center content-center bg-green-500">
        <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Performance
        </button>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    New Performance
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                    type="submit"
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <Form
                    createAlert={createAlert}
                    time={time}
                    location={newCoord}
                    latLng={latLng}
                    setTime={setTime}
                    setNewCoord={setNewCoord}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={clearSelections}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createNewEvent}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NewPerformance;
