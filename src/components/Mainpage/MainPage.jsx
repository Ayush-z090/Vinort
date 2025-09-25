import React, { useContext, useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import UserInterest from '../UserInterest/UserInterest';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const MainPage = () => {
  const [showUserInterest, setShowUserInterest] = useState(false);
  const {setReply,setTxtActivation} = useContext(AppContext)

  setReply("The first call may take few seconds because the server is currently asleep. Please wait while it wakes up.");
  
  useEffect(() => {
    const activateTimer = setTimeout(() => {
      setTxtActivation(true);
    }, 800);
  
    const deactivateTimer = setTimeout(() => {
      setTxtActivation(false);
    }, 6000);
  
    // cleanup on unmount
    return () => {
      clearTimeout(activateTimer);
      clearTimeout(deactivateTimer);
    };
  }, []);


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