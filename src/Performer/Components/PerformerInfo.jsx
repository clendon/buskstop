import React, { useState } from 'react';

const PerformerInfo = ({profile}) => {
  const name = profile.Name;
  const category = profile.Category;
  const location = profile.Location;
  const image = profile.image
  const followers = profile.Followers.length + ' Followers'
  return (
    <div className="w-screen  bg-red-300">
      <div className="flex flex-col justify-center items-center content-center bg-white rounded-b">
        <div className="w-1/2 h-1/2 border-2 border-black rounded my-2 py-2 bg-yellow-600">
          <img alt="profile pic" src={image} className=""/>
        </div>
        <div className="my-4 mx-2 px-4 py-4 border border-black rounded flex flex-col shadow-md items-center justify-evenly">
          <div className="font-bold">{name}</div>
          <div>{location}</div>
          <div>Genre: {category}</div>
          <div>{followers}</div>
        </div>
      </div>
    </div>
  );
};

export default PerformerInfo;
