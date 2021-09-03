import React from 'react';

const LocationView = ({ event }) => (
  <div className='flex flex-col gap-1'>
    <div className='bg-gray-50 rounded text-center p-1'>{event.location}</div>
    <div className='bg-gray-50 rounded text-center p-1'>{event.coordinates}</div>
    <div className='bg-gray-50 rounded text-center p-1'>{Date(event.date)}</div>
  </div>
);

export default LocationView;
