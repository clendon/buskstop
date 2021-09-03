import React, {useState, useEffect} from 'react';
import Busker from './Components/Busker.jsx';
import SearchBar from '../Shared/SearchBar.jsx';
import axios from 'axios';
import { params } from '../Shared/variables.js';

const buskerSearch = `http://18.191.245.221/${params.people}`

const Search = function() {
  const [buskers, setBuskers] = useState([]);

  useEffect(() => {
    axios.get(buskerSearch)
      .then(({ data }) => {
        setBuskers(data);
      });
  }, []);

  useEffect(() => {
    console.log(buskers);
  }, [buskers]);

  const handleSubmit = function(event, input) {
    event.preventDefault();
    axios.get(`${buskerSearch}/${input}`)
      .then(({ data }) => {
        setBuskers(data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return (
    <div id="search-page" className="w-screen h-full max-h-full flex flex-col bg-gray-700">
      <SearchBar handleSubmit={handleSubmit} />
      <div id="search-display" className="overflow-scroll w-screen mb-10">
        {buskers.map((busker) => <Busker key={busker.ID} busker={busker} />)}
      </div>
    </div>
  );
};

export default Search;
