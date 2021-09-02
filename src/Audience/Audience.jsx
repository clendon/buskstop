import React, { useState } from 'react'; //eslint-disable-line
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

const Audience = (props) => {
  {/* <Feed performances={samplePerformances} performer={profile.performer}/> */}
  if (!props.name) {
    return <Redirect to="/login"/>  
  } 

  return (
    <div>props.name</div>
  );
};

export default Audience;
