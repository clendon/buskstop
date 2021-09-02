import React from 'react';
import axios from 'axios';
import moment from 'moment';

const PerformerTile = ({event, getBuskerProfile, buskerName}) => {
  const location = event.location;
  const date = moment(Number(event.date)).format('MMMM Do YYYY, h:mm:ss a');

  const deleteEvent = () => {
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
        getBuskerProfile()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen pt-3 bg-red-300 ">
      <div className="flex flex-row min-w-full bg-purple-600">
        <div className="flex flex-col w-4/6 bg-green-500">
          <div className="bg-green-400">
            <div>{location}</div>
          </div>
          <div className="">
            <div>{date}</div>
          </div>
        </div>
        <div className="lex justify-center items-center w-2/6 bg-gray-200'">
          <button type="submit" onClick={deleteEvent}>Delete</button>
        </div>
      </div>
    </div>

  );
};

export default PerformerTile;
