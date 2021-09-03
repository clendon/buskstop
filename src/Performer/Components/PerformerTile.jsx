import React from 'react';
import axios from 'axios';
import moment from 'moment';

const PerformerTile = ({event, getBuskerProfile, buskerName}) => {
  const location = event.location;
  const date = moment(Number(event.date)).format('MMMM Do YYYY, h:mm:ss a');

  const deleteEvent = () => {
    console.log(event, buskerName)
    const data = JSON.stringify(event);

    const configDeleteEvent = {
      method: 'delete',
      url: `http://localhost:3000/buskers/${buskerName}/events`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(configDeleteEvent)
      .then((response) => {
        getBuskerProfile();
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen pt-3 bg-white mx-1">
      <div className="flex flex-row min-w-full bg-white border-2 border-black rounded mx-1">
        <div className="flex flex-col w-4/6 bg-yellow600">
          <div className="flex flex-col bg-yellow-600">
            <div><b>Location</b></div>
            <div>{location}</div>
          </div>
          <div className="flex flex-col bg-green-400">
            <div><b>Date</b></div>
            <div>{date}</div>
          </div>
        </div>
        <div className="grid place-items-center w-2/6 bg-gray-200'">
          <button 
            type="submit" 
            onClick={deleteEvent} 
            className="rounded w-3/4 h-1/3 bg-yellow-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

  );
};

export default PerformerTile;
