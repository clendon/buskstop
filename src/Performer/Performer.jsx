import React, { useState } from 'react';
import PerformerInfo from './PerformerInfo.jsx';
import PerformerTile from './PerformerTile.jsx';

const Performer = (props) => {
  const performances = [1, 2, 3];

  return (
    <div>

      <PerformerInfo />
      {performances.map(() => <PerformerTile />)}
    </div>

  );
};

export default Performer;
