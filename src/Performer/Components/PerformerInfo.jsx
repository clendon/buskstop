import React, { useState } from 'react';

const PerformerInfo = () => {
  const name = 'name';
  const role = 'role';
  const image = 'https://iconarchive.com/download/i61331/majdi-khawaja/shrek/Shrek-2.ico';
  const followers = 5 + ' Followers'
  return (
    <div className="w-screen  bg-red-300">
      <div className="flex flex-col justify-center items-center content-center bg-green-500">
        <div>
          <img src={image}/>
        </div>
        <div>{name}</div>
        <div>{role}</div>
        <div>{followers}</div>
      </div>
    </div>
  );
};

export default PerformerInfo;
