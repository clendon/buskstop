import React, { useState } from 'react';
import Datetime from "react-datetime";
import MapModal from './MapModal.jsx';

const Form = ({setNewCoord, latLng, setTime, time, location, createAlert}) => {

  const [mapOpen, setMapOpen] = useState(false);

  return (
    <form className="bg-white px-8 pt-6 pb-8 mb-4">
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center text-gray-700 text-sm font-bold mb-2">
          {time !== null ? 'Time Selected' : 'Select Time'}
          <Datetime onChange={(e) => setTime(e._i)} initialValue={Date.now()} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setMapOpen(true)}>
          {location !== null ? 'Location Selected' : 'Choose Location'}
        </button>
      </div>
      {mapOpen ? (
        <MapModal
          createAlert={createAlert}
          setMapOpen={setMapOpen}
          setNewCoord={setNewCoord}
          latLngOG={latLng}
        />
      ) : null}
    </form>
  );
};

export default Form;
