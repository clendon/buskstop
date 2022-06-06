import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../env/config.js';
import NewPerformance from './Components/NewPerformance.jsx';
import PerformerInfo from './Components/PerformerInfo.jsx';
import PerformerTile from './Components/PerformerTile.jsx';
import Alert from './Components/Alert.jsx';

const Performer = () => {
  const [latLng, setLatLng] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState();
  const buskerName = 'Shrek';

  // sets the default coordinates to the area the busker is located in
  const setMapArea = (object) => {
    const locality = object.Location.split(',')[0];
    const country = object.Location.split(',')[1];
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
        if (latLng === null) {
          setMapArea(response.data[0]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  // create custom alert
  const createAlert = (promptText) => {
    setShowAlert(true);
    setAlertText(promptText);

  };

  useEffect(() => {
    getBuskerProfile();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="">
      <PerformerInfo profile={profile}/>
      {showAlert ? <Alert showAlert={showAlert} setShowAlert={setShowAlert} color="pink" text={alertText}/> : null}
      <NewPerformance createAlert={createAlert} getBuskerProfile={getBuskerProfile} profile={profile} latLng={latLng} setShowAlert={setShowAlert} />
      {profile.Events.map((event) => <PerformerTile key={event._id} buskerName={buskerName} event={event} getBuskerProfile={getBuskerProfile} />)}
    </div>
  );

};

export default Performer;
