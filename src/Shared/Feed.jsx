import React, { useState } from 'react';
//this component assumes that it's getting passed a 'performances' prop which is an array of objects
//for now, it also assumes that each 'performance' looks like the sample object below
//it also assumes a 'performer' prop which is true if it's getting displayed on a performer's home page (as opposed to an audience member's)

const samplePerformances = [
  {
    name: 'Mickey Mack',
    location: 'Bushwick',
    category: 'Freeform Jazz',
    date: 'Tuesday, Aug. 31',
    time: '08:30PM'
  },
  {
    name: 'Raymond T. Raymonds',
    location: 'House of Blues',
    category: 'Standup Comedy',
    date: 'Wednesday, Sep. 1',
    time: '08:30PM'
  },
  {
    name: 'Miss Sky Hawaii',
    location: 'D.A.R. Constitution Hall',
    category: 'Rock',
    date: 'Thursday, Sep. 2nd',
    time: '08:30PM'
  },
];
const Feed = ({performances, performer}) => {
  return (
    <div>
      {performer && 
        <button className="border border-black rounded">Add a Performance</button>
      }
      {performances && performances.map((item, index) => (
        <Card performance={item} key={index}/>
      ))}
    </div>
  );
};

const Card = ({performance}) => {
  return (
    <div>
      
    </div>
  ); 
};

export default Feed;
