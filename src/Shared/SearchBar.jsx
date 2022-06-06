import React, { useState, useEffect } from 'react';

const SearchBar = function({ handleSubmit, width, upperMargin }) {
  const [input, setInput] = useState('');

  const handleChange = function(event) {
    setInput(event.target.value)
  }

  return (
    <div className={`h-10 grid w-full bg-yellow-600 ${width} lg:h-16 ${upperMargin} lg:flex lg:flex-row lg:justify-center lg:items-center`}>
      <form onSubmit={(event) => handleSubmit(event, input)} className="align-self-center justify-self-center row-end-3 w-3/5 lg:justify-self-auto lg:flex lg:flex-row lg:justify-center lg:items-center">
        <input type="text" placeholder="Search Buskers" value={input} onChange={handleChange} className="text-center w-full rounded bg-gray-50" />
        <input type="submit" className="hidden lg:inline lg:ml-8 lg:bg-gray-50 rounded" />
      </form>
    </div>
  )
};

export default SearchBar;
