import React, { useState } from 'react';

//links are still broken, waiting on routing in the larger app
//right now no props but can refactor later to take dynamic options if necessary

const Hamburger = () => {
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(!open);
  };

  // so this is going to need state in order to not render the performances link
  // will also need state for user's ID

  return (
    <>
      {open &&
        <div className="flex flex-col border border-black rounded w-max absolute bottom-10">
          <a oncClick={clickHandler} href="#/map" className="border-b border-black">map</a>
          <a href="#" className="border-b border-black">feed</a>
          <a href="#" className="border-b border-black">your performances</a>
          <a href="#/search" className="border-b border-black">search all buskers</a>
          <a href="#">logout</a>
        </div>
      }
      <button onClick={clickHandler} className="border border-black rounded px-1 max-w-max">
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </button>
    </>
  );

};

export default Hamburger;


