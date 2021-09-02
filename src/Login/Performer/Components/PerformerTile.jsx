import React, { useState } from 'react';

const PerformerTile = (props) => {
  const location = 'location';
  const date = 'date';
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
          <div>edit</div>
        </div>
      </div>
    </div>

  );
};

export default PerformerTile;
