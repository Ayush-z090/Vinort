import React, { useState } from 'react';
import styles from './MainPage.module.css';
import UserInterest from '../UserInterest/UserInterest';
import { Navigate, useNavigate } from 'react-router-dom';


const MainPage = () => {
  const [showUserInterest, setShowUserInterest] = useState(false);

  const handleStartJourney = () => {
    setShowUserInterest(true);
  };


  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.mainTitle}>Welcome to Vinort</h1>
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
  let Navigate = useNavigate()

  return(
    <>
      <p className={styles.tagline}>Master any skill with AI-powered guidance - watch videos, chat with your tutor, and get instant help when you're stuck.</p>
      <button 
      onClick=
      {
        ()=>{
          if(localStorage.getItem("UserChoosenCategoires")) Navigate("/Home")
          else setShowCOnditon(!showCondition)
          }
      }>start journey</button>
    </>
  )
}