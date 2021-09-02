import React, {useState, useEffect} from 'react';

// DONKEY
const Shrek = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/profile/Shrek/busker`)
    .then(res => res.json())
    .then(data => setUrl(data[0].image))
    .catch(err => console.error('error in the swamp', err));
  }, []);

  return (
    <div className="grid w-full h-1/2 place-items-center">
      <img src={url} alt="an image of Shrek from the movie series" />
    </div>
  );
};

export default Shrek;
