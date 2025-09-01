import React, { useState } from 'react';
import styles from './MainPage.module.css';
import UserInterest from '../UserInterest/UserInterest';
import VidBg from "../../assets/BG.mp4"


const MainPage = () => {
  const [showUserInterest, setShowUserInterest] = useState(false);

  const handleStartJourney = () => {
    setShowUserInterest(true);
  };


  return (
    <div className={styles.mainContainer}>
        <video 
        autoPlay
        loop
        className={styles.vidBackground} src={VidBg}></video>
      <h1 className={styles.mainTitle}>Welcome to My App</h1>
      <div className={styles.content}>
        {showUserInterest ? <UserInterest 
        setShowCOnditon={setShowUserInterest}/> : 
        <ContentClass
        showCondition ={showUserInterest}
        setShowCOnditon={setShowUserInterest}/>}
      </div>
    </div>
  );
};

export default MainPage;

function ContentClass({showCondition,setShowCOnditon}){
  return(
    <>
      <p className={styles.tagline}>Master any skill with AI-powered guidance - watch videos, chat with your tutor, and get instant help when you're stuck.</p>
      <button onClick={()=>setShowCOnditon(!showCondition) }>start journey</button>
    </>
  )
}