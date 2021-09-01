import React, { useState, useEffect } from 'react';
import MapModal from './MapModal.jsx';
import NewPerformance from './NewPerformance.jsx';
import PerformerInfo from './PerformerInfo.jsx';
import PerformerTile from './PerformerTile.jsx';
import axios from 'axios';

const Performer = (props) => {
  const performances = [1, 2, 3];
  const [log, setLog] = useState();
  const [mapOpen, setmapOpen] = useState(false);
  const locality = 'Boston MA'
  const country = 'United States'
  const [latLng, setLatLng] = useState();

  const check = (ee) => {
    console.log(ee)
  }

  useEffect(()=>{

    let config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${locality}|country:${country}&key=${''}`,
      headers: { }
    };

    axios(config)
    .then((response) => {
      setLatLng(response.data.results[0].geometry.location)
    })
    .catch((error) => {
      console.log(error);
    });



  },[])


  return (
    <div>
      <PerformerInfo />
      <NewPerformance setmapOpen={setmapOpen} latLng={latLng}/>
      {performances.map(() => <PerformerTile />)}
    </div>

  );
};

export default Performer;
