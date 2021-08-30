import React, { useState } from 'react';

const PerformerInfo = (props) => {
  var name = 'name'
  var location = 'location'
  var image = 'https://iconarchive.com/download/i61331/majdi-khawaja/shrek/Shrek-2.ico'
  return (
    <div className='w-screen h-1/6 bg-red-300'>
    <div className='flex flex-row min-w-full bg-purple-600'>
    <div className='flex justify-center items-center w-2/6 bg-gray-200'>
        <div><img src={image}/></div>
        </div>
      <div className='flex flex-col w-4/6 bg-green-500'>
        <div className=' bg-green-400'>
          <div>{name}</div>
        </div>
        <div className=''>
          <div>{location}</div>
        </div>
      </div>

    </div>
  </div>

  );
}

export default PerformerInfo;