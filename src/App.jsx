import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './components/Mainpage/MainPage';
import styles from './App.module.css';
import ComponentHandler from '../page/ComponentHandler/ComponentHandler';
import VidBg from "./assets/BG.mp4"

function App() {
  return (

    <div className={styles.app}>
        <video 
        autoPlay
        loop
        muted
        className={styles.vidBackground} src={VidBg}></video>
    {/* <ComponentHandler/> */}
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/controler' element={<ComponentHandler/>}/>
    </Routes>
    </div>
    
  );
}

export default App;
