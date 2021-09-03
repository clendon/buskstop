import React from 'react';

const LocationView = ({ event }) => (
  <div className='flex flex-col'>
    <div className='m-1 bg-gray-50 rounded'>{event.location}</div>
    <div className='m-1 bg-gray-50 rounded'>{event.coordinates}</div>
    <div className='m-1 bg-gray-50 rounded'>{Date(event.date)}</div>
  </div>
);

export default LocationView;
