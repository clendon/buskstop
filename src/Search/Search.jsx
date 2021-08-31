import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Busker from './Components/Busker.jsx';
import params from './variables.js';

const Search = function() {
  const [buskers, setBuskers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/${params.people}`)
      .then(({ data }) => {
        setBuskers(data);
      });
  }, []);

  useEffect(() => {
    console.log(buskers);
  }, [buskers]);

  return (
    <div id="search-page" className="w-screen h-full max-h-full">
      <div>This will be the search bar component</div>
      <div id="search-display" className="max-h-full overflow-scroll">
        {buskers.map((busker) => <Busker key={busker.ID} busker={busker} />)}
      </div>
    </div>
  );
};

export default Search;
