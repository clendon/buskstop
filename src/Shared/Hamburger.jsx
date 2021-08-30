import React, {useState, Fragment} from 'react';

const Hamburger = ({options}) => {
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      {open && 
        <div className="flex flex-col border rounded w-max">
          <a href="#">map</a>
          <a href="#">feed</a>
          <a href="#">your performances</a>
          <a href="#">search all buskers</a>
          <a href="#">logout</a>
        </div>
      }
      <button onClick={clickHandler} className="border rounded">
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


