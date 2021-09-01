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
      <div className="border border-black rounded flex flex-col justify-center">
        {performances && performances.map((item, index) => (
          <Card performance={item} key={index} onClick={modalHandler} />
        ))}
      </div>
    </>
  );
};

const Card = ({performance}) => (
  <div className="border border-black rounded flex flex-wrap justify-evenly">
    <p>{performance.name}</p>
    <p>{performance.location}</p>
    <p>{performance.category}</p>
    <p>{performance.date}</p>
    <p>{performance.time}</p>
  </div>
);

export default Feed;
