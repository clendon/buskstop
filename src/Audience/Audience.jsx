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
  const [following, setFollowing] = useState([]);
  const [performances, setPerformances] = useState([]);

  if (!name) {
    return <Redirect to="/login"/>  
  } 
  
  useEffect(async () => {
    try {
      const followingList = await fetch(`http://localhost:3000/users/${name}/following`);
      console.log(followingList);
    } catch (err) {
      console.error(err);
    } 
  }, []);

  return (
    <div>
    </div>
  );
};

export default Audience;
