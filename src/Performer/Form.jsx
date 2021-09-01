import React, { useState } from 'react';
import Datetime from "react-datetime";
import MapModal from './MapModal.jsx';


const Form = (props) => {

  const [mapOpen, setMapOpen] = useState(false);

  const check = (ee) => {
    console.log(ee)
  }


  const log = (e) => {
    console.log(e);
  }
  return (
    <form className="bg-white px-8 pt-6 pb-8 mb-4">
    <div className="mb-6">
      <div className="flex flex-col items-center justify-center text-gray-700 text-sm font-bold mb-2">
        {props.time !== null ? 'Time Selected' : 'Select Time'}
        <Datetime onChange={e=>props.setTime(e._i)} initialValue={Date.now()}/>
      </div>

    </div>
    <div className="flex flex-col items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={()=>setMapOpen(true)}>
      {props.location !== null ? 'Location Selected' : 'Choose Location'}
      </button>
    </div>
    {mapOpen ? <MapModal setMapOpen={setMapOpen} setNewCoord={props.setNewCoord} latLng={props.latLng} check={check}/> : null}
  </form>);
}

export default Form;