import React, { useState } from 'react';

const PerformerInfo = ({profile}) => {
  const name = profile.Name;
  const category = profile.Category;
  const location = profile.Location;
  const image = profile.image
  const followers = profile.Followers.length + ' Followers'
  return (
    <div className="w-screen  bg-red-300">
      <div className="flex flex-col justify-center items-center content-center bg-green-500">
        <div>
          <img alt="profile pic" src={image}/>
        </div>
        <div>{name}</div>
        <div>{location}</div>
        <div>{category}</div>
        <div>{followers}</div>
      </div>
    </div>
  );
};

export default PerformerInfo;
