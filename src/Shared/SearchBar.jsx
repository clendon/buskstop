import React, { useState, useEffect } from 'react';

const SearchBar = function({ handleSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = function(event) {
    setInput(event.target.value)
  }

  return (
    <div className="h-10 grid w-full bg-yellow-600">
      <form onSubmit={(event) => handleSubmit(event, input)} className="align-self-center justify-self-center row-end-3 w-3/5">
        <input type="text" placeholder="Search Buskers" value={input} onChange={handleChange} className="text-center w-full rounded" />
        <input type="submit" className="hidden" />
      </form>
    </div>
  )
};

export default SearchBar;
