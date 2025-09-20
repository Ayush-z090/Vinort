import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './components/Mainpage/MainPage';
import styles from './App.module.css';
import ComponentHandler from './ComponentHandler/ComponentHandler';
import VidBg from "./assets/BG.mp4"

// Create context for sharing state across components
export const AppContext = createContext();

let triakObj ={'prompt_Type': 'VideoDetail', 'passed_URL_ID': null, 'Current_videoId': 'bDzTYIi7Is4', 'message': null, 'vid_Related_res': null, 'HTMl': [{'head': 'Overview of the Transcript', 'body': ['The primary business discussed is about advertising implementation for a global market.', 'The task involves translating the original creative idea into 30 or 40 languages.', 'The company, Arthur, is part of WPP, which contains multiple large global creative agencies.']}, {'head': 'Challenges and Requirements', 'body': ['The production storage faces massive pressure due to the need to hold numerous versions of materials like TV commercials.', 'The company needs an efficient way of uploading and archiving data.', 'They require a system that allows for quick retrieval of material and the ability to retrieve specific parts of the data.', 'The current storage is about five petabytes, emphasizing the need for a responsive and efficient archiving system.']}, {'head': 'Solution and Implementation', 'body': ['The company found a disk-based archiving system to be the most cost-effective and quick solution.', 'The chosen system provides a distributed single namespace for storage, allowing for access to a single storage pool across multiple data centers.', 'The company recently purchased additional storage, totaling 1.7 petabytes, and is in the process of installation.', 'The system has been reliable, with no reported issues, and the company providing the system has been responsive in providing support for installation and configuration.']}]}

console.log(triakObj.HTMl)

function App() {
  // All hook variables moved from ComponentHandler
  // will track apperance of ai reply elemnt it will depent on the aiassistform elemnt 
  const [isTxtAreaActive, setTxtActivation] = useState(false);
  // will track rcommenadtionn video filed via toogle button
  const [showRecommendationTab, setReccoamendation] = useState(false);
  // will track of the situaiton when user want to search for the video 
  const [IsVideoSearch, setSearchVideo] = useState(false); // change it to set searchpage ViewPort
  // will track if user is asking about notes realted to video
  const [isUSer_Note, setNote] = useState(false); // change it to set VideoStream viewPort
  // will track the userSearch value..
  const [SearchQuery, setSearchQuery] = useState("after effects");
  const [SelectedVideoStreamId , setSelectedId] = useState(undefined);

  const [isWidthLimit,setLimit] = useState(false)
  // set the message to tell user about the action that has taken by the instruction of the form
  const [ai_Reply,setReply] = useState("waiting for the userPrompt")
  const [returnHTML,setHTML] = useState(triakObj.HTMl);
  // Context value containing all state and setters
  const contextValue = {
    isTxtAreaActive,
    setTxtActivation,
    showRecommendationTab,
    setReccoamendation,
    IsVideoSearch,
    setSearchVideo,
    isUSer_Note, setNote,
    SearchQuery,
    setSearchQuery,
    SelectedVideoStreamId,
    setSelectedId,
    ai_Reply,
    setReply,
    returnHTML,
    setHTML,
    isWidthLimit
  };

  useEffect(()=>{
    if (window.innerWidth < 700 ) setLimit(true);
    window.addEventListener("resize",()=>{
      if (window.innerWidth < 700) setLimit(true);
      else setLimit(false)

    });
  },[])

  return (
    <AppContext.Provider value={contextValue}>
      <div className={styles.app}>
          <video 
          autoPlay
          loop
          muted
          className={styles.vidBackground} src={VidBg}>

          </video>
          <ComponentHandler/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
