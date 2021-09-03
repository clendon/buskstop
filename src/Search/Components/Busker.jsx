import React, { useState, useEffect } from 'react';
import LocationView from './LocationView.jsx';

const Busker = function({ busker }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='h-auto border-transparent rounded flex flex-col bg-yellow-600 p-2 gap-2 hover:bg-yellow-700'>
      {/* Name, Category, and User Picture Container */}
      <div className='flex flex-row h-20 gap-2 ' onClick={handleClick} >
        {/* Name and Category */}
        <div className='bg-gray-50 rounded flex gap-1 items-center flex-grow justify-between p-4'>
          <div className='text-left flex-shrink text-xl font-bold'>{busker.Name}</div>
          <div className='flex-grow text-right italic'>{busker.Category}</div>
        </div>
        {/* User Image */}
        <div className='rounded bg-gray-50 flex overflow-hidden justify-center content-center flex-shrink'>
          <img className='w-20' src={busker.image} alt='user profile' />
        </div>
      </div>

      {/* Expanded View When Clicked */}
      {isOpen &&
        (busker.Events.length === 0
        ? <div className='bg-gray-50 rounded text-center p-1'>No Upcoming Events</div>
        : (() =>
          <div className='flex flex-col gap-4 my-2'>
            {busker.Events.map((event, index) =>
              <LocationView event={event} key={event._id} id={index} />)}
          </div>
          )()
        )
      }
    </div>
  );
};

export default Busker;


/**
 * [
 * location
 * location (text)
 * description
 * ]
 * Upcoming Performance
 *
 * {(isOpen
      ? "h-auto" : "h-36") + "h-auto m-1 border-transparent rounded flex flex-column bg-gray-600"}
 *

AudienceorPerformer: "Performer"
Cash: "smelika"
Category: "Other"
Coordinates: "{ lat: 40.8172, lng: -74.1910 }"
Date/Time: ""
Description: "There were a lot of paintings of monkeys waving bamboo sticks in the gallery."
ID: "6"
Location: "New York City, United States"
Name: "Jar Jar Binks"
events: Array(0)
  length: 0
followers: Array(0)
  length: 0
image: "https://static.wikia.nocookie.net/starwars/images/0/02/Jar_Jar_SWSB.png/revision/latest?cb=20160910034613"
_id: "612fd1e6f0b41ed8aa05b351"
 *
 *
 */