import React from 'react'; //eslint-disable-line
// this component assumes that it's getting passed a performances prop which is an array of objects
// for now, it also assumes that each 'performance' looks like the sample objects below
// it also assumes a performer prop which is true if user is performer

const Feed = ({ performances, performer }) => (
  <div className="border border-black rounded flex flex-col justify-center">
    {performer &&
      <button className="border border-black rounded" type="button">Add a Performance</button>
    }
    {performances && performances.map((item, index) => (
      <Card performance={item} key={index} />
    ))}
  </div>
);

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
