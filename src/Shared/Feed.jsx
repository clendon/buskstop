import React, { useState } from 'react'; //eslint-disable-line
import Modal from './Modal.jsx' //eslint-disable-line
// this component assumes that it's getting passed a performances prop which is an array of objects
// for now, it also assumes that each 'performance' looks like the sample objects in App
// it also assumes a performer prop which is true if user is performer

const Feed = ({ performances, performer }) => {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = (e) => {
    // modalContent = performances[index];
    // setShowModal(!showModal);
    e.preventDefault();
    console.log('modal here!');
  };

  return (
    <>
      <div className="mx-1 rounded flex flex-col h-full justify-start">
        {performances && performances.map((item, index) => (
          <Card performance={item} key={index} onClick={modalHandler} />
        ))}
      </div>
    </>
  );
};

const Card = ({performance}) => {
  const deleteHandler = () => {};

  return (
    <div className="border shadow-lg my-2 grid grid-rows-2 grid-cols-3 rounded ">
      <div className="row-span-2 rounded-l bg-yellow-600 text-white grid place-items-center">{performance.name}</div>
      <div className="col-span-2 row-span-2 mx-2 my-2 min-h-116">
        <div>{performance.location}</div>
        <div>{performance.date}</div>
        <div>{performance.time}</div>
      </div>
    </div>
  );
};

export default Feed;
