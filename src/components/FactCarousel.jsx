import React, { useState } from 'react';

const FactCarousel = ({ facts }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % facts.length);
  };

  const currentFact = facts[index];

  return (
    <div>
      <div className='text-3xl font-bold mb-4'>
        <h3 className='text-4xl md:text-5xl font-extrabold mb-4'>{currentFact.title}</h3>
        <p className='text-lg md:text-xl mb-6 max-w-xl font-poppins'>{currentFact.text}</p>
      </div>
      <button onClick={handleNext} className='bg-[#7A3D02] hover:bg-[#5c2e01] text-[#DEBE89] text-lg px-6 py-3 rounded-lg shadow-md uppercase font-bold font-poppins transition'>
        Next Fact
      </button>
    </div>
  );
};

export default FactCarousel;
