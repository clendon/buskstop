import React, { useState, useEffect } from 'react';
import LocationView from './LocationView.jsx';

const Busker = function({ busker }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //TODO: remove borders, add dropshadow to bottom
  return (
    <div onClick={handleClick} className='h-auto m-1 border-transparent rounded flex flex-col bg-gray-600'>
      {/* Name, Category, and User Picture */}
      <div className='flex flex-row'>
        {/* Name and Category */}
        <div className='m-1 bg-gray-50 rounded flex gap-1'>
          <div>{busker.Name}</div>
          <div className=''>{busker.Category}</div>
        </div>
        {/* User Image */}
        <div className='m-1 rounded bg-clip-border'>
          <img className='object-contain' src={busker.image} alt='user profile' />
        </div>
      </div>
      {/* Upcoming Events */}
      <div>
        {busker.Events.length === 0 ? 'No Upcoming Events' : 'Click To See My Upcoming Events'}
      </div>
      {/* Events List Section - Only Renders when clicked */}
      <div className=''>
        {isOpen && busker.Events.map(event => <LocationView event={event} key={event._id} />)}
      </div>
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