import React, { useState, useEffect } from 'react';

const SearchBar = function({ handleSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = function(event) {
    setInput(event.target.value)
  }

  return (
    <div className="h-36">
      <form onSubmit={(event) => handleSubmit(event, input)}>
        <input type="text" placeholder="Search Buskers" value={input} onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  )
};

export default SearchBar;
