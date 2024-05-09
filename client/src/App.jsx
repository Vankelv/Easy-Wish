import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BsArrowsFullscreen } from "react-icons/bs";
import './index.css';
import Switcher12 from './components/switcher12';
import Home from './pages/home';
import SendWish from './pages/sendWish';
import ThankYou from './pages/thankYou';
import BackgroundLoop from './components/carousel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [open, setOpen] = useState(false); 

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.screen.orientation.type === 'landscape-primary' || window.screen.orientation.type === 'landscape-secondary') {
        setOpen(true); 
      } else {
        setOpen(false); 
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
    <Router >
      <div 
      className={` ${isDarkMode ? 'dark' : ''} md:w-full justify-center flex flex-col`}
      style={isDarkMode ? { color: 'dark' } : {}}
      >
        <h1 className='mt-10 font-poppins text-center font-bold text-[100px] sm:text-[30px]'>Happy Birthday Naa</h1>
        <div className="absolute top-4 gap-5 justify-between right-4 flex items-center">
        <nav>
            <ul className="flex justify-center space-x-6 font-poppins my-6">
              <li >
                <Link to="/">Send Wish</Link>
              </li>
            </ul>
          </nav>
          <span className='mr-4'><button onClick={toggleFullScreen}><BsArrowsFullscreen/></button></span>
          <Switcher12 isChecked={isDarkMode} handleCheckboxChange={toggleDarkMode} /> 
        </div>

        <div className='mx-1'>
          <Routes>
            <Route path="/home" element={<Home isDarkMode={isDarkMode}/>} />
            <Route path="/" element={<SendWish />} />
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
        </div>

        <div className='mx-10'>
          <BackgroundLoop/>
        </div>
      </div>
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Please use portrait</DialogTitle>
          <DialogContent>
            App is available in only portrait mode.
          </DialogContent>
        </ModalDialog>
      </Modal>
    </Router>
  );
}

export default App;
