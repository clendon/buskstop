import React, { useState, useEffect } from 'react'; //eslint-disable-line
import Feed from '../Shared/Feed.jsx'; //eslint-disable-line
import { Redirect } from 'react-router-dom';

const samplePerformances = [
  {
    name: 'Mickey Mack',
    location: 'Bushwick',
    category: 'Freeform Jazz',
    date: 'Tuesday, Aug. 31',
    time: '08:30PM',
  },
  {
    name: 'Raymond T. Raymonds',
    location: 'House of Blues',
    category: 'Standup Comedy',
    date: 'Wednesday, Sep. 1',
    time: '08:30PM',
  },
  {
    name: 'Miss Sky Hawaii',
    location: 'D.A.R. Constitution Hall',
    category: 'Rock',
    date: 'Thursday, Sep. 2nd',
    time: '08:30PM',
  },
];

const Audience = ( {name} ) => {
  {/* <Feed performances={samplePerformances} performer={profile.performer}/> */}
  const [performances, setPerformances] = useState([]);

  if (!name) {
    return <Redirect to="/login"/>  
  } 

  //need this function to process messy response from db 
  const followProcessor = (arr) => {
    const followers = arr.map(item => Object.values(item).slice(0, -1).join(''));
    return followers;
  };

  useEffect(async () => {
    try {
      const followedList = await fetch(`/users/${name}/following`)
        .then(res => res.json())
        .then(data => followProcessor(data));
      let events = [];      
      console.log(followedList);
      for (const busker of followedList) {
        const eventList = await fetch(`/buskers/${busker}/events`).then(res => res.json());
        console.log(eventList);
      }

    } catch (err) {
      console.error(err);
    } 
  }, []);

  return (
    <div>
      audience here
    </div>
  );
};

export default Audience;
