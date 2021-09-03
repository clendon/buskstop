import React, { useState } from 'react';

const LocationView = ({ event, id }) => {
  const initialState = id === 0 ? true : false;
  const [ isOpen, setIsOpen ] = useState(initialState);

  // Extract digits from coordinates string
  const [ latitude, longitude ] = event.coordinates.match(/\-?\d+\.\d+/g);

  // Converting time and date to readable format.
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    };
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }
  const dateNum = new Date(Number(event.date));
  const eventDate = dateNum.toLocaleDateString('en-US', dateOptions);
  const eventTime = dateNum.toLocaleTimeString('en-US', timeOptions);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
  <div className='flex flex-col bg-gray-50 rounded mx-4 p-4 gap-2 hover:bg-gray-200' onClick={handleClick} >
    <div className='h-auto text-center flex justify-center items-center font-bold text-lg' onClick={handleClick} >
      {event.location}
    </div>
    {isOpen &&
      <>
        <div className='h-auto text-center flex justify-center items-center text-lg'>
          <a href={`https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`} className='flex items-center justify-center text-lg text-yellow-600 transform hover:scale-105'>Click Here to View In Google Maps</a>
        </div>
        <div className='text-center flex flex-column justify-center items-center text-lg'>
          <span>{eventDate} at {eventTime}</span>
        </div>
      </>
    }
  </div>
  )
};

export default LocationView;

// toLocaleDateString('en-US', {
//   weekdate: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
//   })