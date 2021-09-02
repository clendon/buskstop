import React, {useState, useEffect} from 'react';
import Busker from './Components/Busker.jsx';
import SearchBar from '../Shared/SearchBar.jsx';
import axios from 'axios';
import { params } from '../Shared/variables.js';

const buskerSearch = `http://localhost:3000/${params.people}`

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
    <div id="search-page" className="w-screen h-full flex flex-col bg-gray-700 lg:items-center">
      <SearchBar handleSubmit={handleSubmit} width={'lg:w-10/12'} upperMargin={'lg:mt-28'}/>
      <div id="search-display" className="overflow-y-scroll w-screen mb-10 lg:center lg:h-4/6 lg: lg:w-10/12 lg:mb-0 lg:mt-16">
        {buskers.map((busker) => <Busker key={busker.ID} busker={busker} />)}
      </div>
    </div>
  );
};

export default Search;
