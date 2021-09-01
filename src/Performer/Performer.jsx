import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../env/config.js';
import NewPerformance from './Components/NewPerformance.jsx';
import PerformerInfo from './Components/PerformerInfo.jsx';
import PerformerTile from './Components/PerformerTile.jsx';

const Performer = () => {
  const [latLng, setLatLng] = useState();
  const performances = [1, 2, 3];
  const locality = 'Boston MA';
  const country = 'United States';

  // sets the default coordinates to the area the busker is located in
  const setMapArea = () => {
    const configAxios = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${locality}|country:${country}&key=${config.googleMaps.API}`,
      headers: { },
    };

    axios(configAxios)
      .then((response) => {
        setLatLng(response.data.results[0].geometry.location);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setMapArea();
  }, []);

  return (
    <div>
      <PerformerInfo />
      <NewPerformance latLng={latLng} />
      {performances.map(() => <PerformerTile />)}
    </div>

  );
};

export default Performer;
