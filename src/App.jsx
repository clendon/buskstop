import React, { useState, useEffect } from 'react';
import Performer from './Performer/Performer.jsx'

//central React App component
//random tailwind adds to test functionality
const App = () => {
  return (
      <div className="min-w-screen bg-gray-200 rounded-shadow border-4 bg-gray-500">
        testing
        <Performer/>
      </div>
  );
};

export default App;