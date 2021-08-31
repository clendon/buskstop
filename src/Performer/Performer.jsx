import React, { useState } from 'react';
import MapModal from './MapModal.jsx';
import NewPerformance from './NewPerformance.jsx';
import PerformerInfo from './PerformerInfo.jsx';
import PerformerTile from './PerformerTile.jsx';

const Performer = (props) => {
  const performances = [1, 2, 3];
  const [log, setLog] = useState();
  const [mapOpen, setmapOpen] = useState(false);

  const check = (ee) => {
    console.log(ee)
  }

  return (
    <div>
      <NewPerformance />
      <PerformerInfo />
      {performances.map(() => <PerformerTile />)}
    </div>

  );
};

export default Performer;
