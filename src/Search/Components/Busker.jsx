import React, {useState, useEffect} from 'react';

const Busker = function({busker}) {

  return (
    <div className="h-36 border-black border-solid border-2 grid relative grid-rows-2 grid-cols-2">
      <span>{busker.Name}</span>
      <span className="row-start-2">{busker.Category}</span>
      <div className="h-3/4 justify-self-end absolute align-self-center row-start-1 row-end-3">
        <img className="max-h-full max-w-full object-contain" src={busker.image} alt="" />
      </div>
      </div>
  )
}

export default Busker;
