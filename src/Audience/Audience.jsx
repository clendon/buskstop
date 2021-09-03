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

  //need this function to process messy response from db 
  const followProcessor = (arr) => {
    const followers = arr.map(item => Object.values(item).slice(0, -1).join(''));
    return followers;
  };

  useEffect(async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${name}/following`)
      .then(res => res.json());
      console.log(followProcessor(res));

      // const post = await fetch(`http://localhost:3000/users/${name}/follow`, {
      //   method: 'POST',
      //   body: "Shrek",
      //   headers: {'Content-Type': 'application/json'}
      // }).then(res => console.log('post res here', res));
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
