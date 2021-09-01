import React, { useState, useEffect } from 'react';

const Busker = function({ busker }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={handleClick} className={(isOpen ? "h-52" : "h-36") + " border-black border-solid border-2 grid relative grid-rows-2 grid-cols-2 bg-yellow-600"}>
      <div>
        <span>{busker.Name}</span>
        <span className="row-start-2">{busker.Category}</span>
      </div>
      <div className="h-3/4 justify-self-end absolute align-self-center row-start-1 row-end-3">
        <img className="max-h-full max-w-full object-contain" src={busker.image} alt="" />
      </div>
    </div>
    {isOpen && () => {
      <>

      </>
    }}
  );
};

export default Busker;


/**
 *
AudienceorPerformer: "Performer"
Cash: "smelika"
Category: "Other"
Coordinates: "{ lat: 40.8172, lng: -74.1910 }"
Date/Time: ""
Description: "There were a lot of paintings of monkeys waving bamboo sticks in the gallery."
ID: "6"
Location: "New York City, United States"
Name: "Jar Jar Binks"
events: Array(0)
  length: 0
followers: Array(0)
  length: 0
image: "https://static.wikia.nocookie.net/starwars/images/0/02/Jar_Jar_SWSB.png/revision/latest?cb=20160910034613"
_id: "612fd1e6f0b41ed8aa05b351"
 *
 *
 */