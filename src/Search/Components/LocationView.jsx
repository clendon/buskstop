import React from 'react';

const LocationView = ({ event }) => (
  <div>
    <div>Here are my events!</div>
    <div>{event.location}</div>
    <div>{event.coordinates}</div>
    <div>{event.date}</div>
  </div>
);

export default LocationView;
