import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../env/config.js';
import NewPerformance from './Components/NewPerformance.jsx';
import PerformerInfo from './Components/PerformerInfo.jsx';
import PerformerTile from './Components/PerformerTile.jsx';
import Feed from '../Shared/Feed.jsx';

const Performer = () => {
  const [latLng, setLatLng] = useState();
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const performances = [1, 2, 3];
  const buskerName = 'Shrek'

  // sets the default coordinates to the area the busker is located in
  const setMapArea = (object) => {
    const locality = object.Location.split(',')[0]
    const country = object.Location.split(',')[1]
    const profileMap = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${locality}|country:${country}&key=${config.googleMaps.API}`,
      headers: {},
    };

    axios(profileMap)
      .then((response) => {
        setLatLng(response.data.results[0].geometry.location);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // gets busker profile
  const getBuskerProfile = () => {
    const configProfile = {
      method: 'get',
      url: `http://localhost:3000/profile/${buskerName}/busker`,
      headers: {},
    };

    axios(configProfile)
      .then((response) => {
        setProfile(response.data[0]);
        setMapArea(response.data[0]);
        console.log(response.data[0])
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    getBuskerProfile();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <PerformerInfo profile={profile}/>
      <NewPerformance latLng={latLng} />
      {/* <Feed performances={profile.Events}/> */}
      {profile.Events.map(() => <PerformerTile />)}
    </div>
  );

};

export default Performer;
