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
      <div className="border border-blackrounded flex flex-col justify-center">
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
    <div className=" border border-black rounded flex flex-col justify-evenly">
      <div>{performance.name}</div>
      <div>{performance.location}</div>
      <div>{performance.category}</div>
      <div>{performance.date}</div>
      <div>{performance.time}</div>
      <button className="border-2 border-yellow-600 rounded" type="button">delete</button>
    </div>
  );
};

export default Feed;
