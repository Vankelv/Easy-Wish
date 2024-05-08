import React, { useState, useRef } from 'react';
import { BsArrowsFullscreen } from "react-icons/bs";
import './index.css';
import Switcher12 from './components/switcher12';
import Home from './pages/home';
import SendWish from './pages/sendWish';
import ThankYou from './pages/thankYou';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundLoop from './components/carousel';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleFullScreen = () => {
    const elementRef = document.documentElement;
    if (!document.fullscreenElement) {
      elementRef.requestFullscreen().catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Error attempting to exit full-screen mode:', err);
      });
    }
  };

  return (
    <Router>
      <div className='dark:bg-[#090b23] md:w-full  justify-center flex flex-col' style={isDarkMode ? { color: 'white' } : {}}>
      <h1 className='mt-10 font-poppins text-center font-bold text-[100px] sm:text-[30px]'>Happy Birthday Naa</h1>
        <div className="absolute top-4 right-4 flex items-center">
          <span className='mr-4'><button onClick={toggleFullScreen}><BsArrowsFullscreen/></button></span>
          <Switcher12 isChecked={isDarkMode} handleCheckboxChange={toggleDarkMode} /> 
        </div>
        
        
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SendWish />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
        <div className=' h-40 mx-10'>
        <BackgroundLoop/>
        </div>

      </div>
    </Router>
  );
}

export default App;
