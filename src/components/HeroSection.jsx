import React, { useEffect, useRef } from 'react';
import { ImCancelCircle } from "react-icons/im";
import SearchServices from './common/modal/SearchServices';


const HeroSection = () => {
  const modalRef = useRef(null);

  const showSearchModal = () => {
    modalRef.current.classList.remove('hidden');
  };

  const closeSearchModal = () => {
    modalRef.current.classList.add('hidden');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSearchModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='hero-section'>
      <div className="container mx-auto  p-5 md:px-8 flex items-center justify-between flex-col gap-y-8 pt-10 pb-20">
      <h1 className='text-3xl md:text-4xl text-white font-bold flex'>Hi,<div className='w-8 md:w-12 mx-2'><img src="/assets/wave.gif" alt="" /></div> how can we help you?</h1>
      <SearchServices/>
  </div>
    </div>


  )
}

export default HeroSection