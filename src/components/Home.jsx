import React, { useState, useEffect, useRef } from 'react';
import { name, summary } from '../constants';
import { motion } from "framer-motion";
import Background from './Background';
import Footer from './Footer';

const Home = () => {
  const ref = useRef(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current < name.length) {
        ref.current++;
        setText(prevText => prevText + name[ref.current - 1]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative z-0 min-h-[calc(100vh-100px)]'>
      <ul className="circles">
        <Background />
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        {/* Add more li items as needed */}
      </ul>
      <div className='hero relative h-[calc(93vh)] overflow-hidden flex justify-center items-center text-white' id='hero'>
        <div className='pt-4 h-48 rounded-3xl text-center'>
          <h1 className='text-6xl sm:text-7xl font-extrabold mt-2'>Hi, I'm&nbsp;<span className='text-[#FB6D48] font-extrabold'>{text}</span></h1>
          <p className='mt-3 text-xl max-w-4xl mx-auto'>{summary}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
