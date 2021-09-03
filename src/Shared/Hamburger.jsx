import React, { useState } from 'react';

// links are still broken, waiting on routing in the larger app
// right now no props but can refactor later to take dynamic options if necessary

const Hamburger = ({ hidden }) => {
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(!open);
  };

  // so this is going to need state in order to not render the performances link
  // will also need state for user's ID

  return (
    <>
      {open &&
        (
        // TODO: close the gap, maybe change how the hamburger renders
        <div className="flex flex-col border border-black rounded w-max absolute bottom-10 bg-gray-50 lg:-bottom-32">
          <a href="#/map" className="border-b border-black" onClick={clickHandler}>map</a>
          <a href="#/audience" className="border-b border-black" onClick={clickHandler}>feed</a>
          <a href="#/performer" className="border-b border-black" onClick={clickHandler}>your performances</a>
          <a href="#/search" className="border-b border-black" onClick={clickHandler}>search all buskers</a>
          <a href="#/logout" onClick={clickHandler}>logout</a>
        </div>
        )}
      <button type="button" onClick={clickHandler} className={`border border-black rounded px-1 max-w-max ${hidden}`} >
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20" />
          <rect y="30" width="100" height="20" />
          <rect y="60" width="100" height="20" />
        </svg>
      </button>
    </>
  );
};

export default Hamburger;
