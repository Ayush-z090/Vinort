import React, { createContext, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './components/Mainpage/MainPage';
import styles from './App.module.css';
import ComponentHandler from './ComponentHandler/ComponentHandler';
import VidBg from "./assets/BG.mp4"

// Create context for sharing state across components
export const AppContext = createContext();

function App() {
  // All hook variables moved from ComponentHandler
  // will track apperance of ai reply elemnt it will depent on the aiassistform elemnt 
  const [isTxtAreaActive, setTxtActivation] = useState(false);
  // will track rcommenadtionn video filed via toogle button
  const [showRecommendationTab, setReccoamendation] = useState(false);
  // will track of the situaiton when user want to search for the video 
  const [IsVideoSearch, setSearchVideo] = useState(false); // change it to set searchpage ViewPort
  // will track when video is streaming
  const [videoStreamState, setStreamState] = useState(false); // change it to set VideoStream viewPort
  // will track the userSearch value..
  const [SearchQuery, setSearchQuery] = useState("after effects");
  const [SelectedVideoStreamId , setSelectedId] = useState(undefined);
  // set the prompt when user is searching for a video ..
  const [UserPrompt,setUserPrompt] = useState("help")
  // set the message to tell user about the action that has taken by the instruction of the form
  const [ai_Reply,setReply] = useState("waiting for the userPrompt")

  // Context value containing all state and setters
  const contextValue = {
    isTxtAreaActive,
    setTxtActivation,
    showRecommendationTab,
    setReccoamendation,
    IsVideoSearch,
    setSearchVideo,
    videoStreamState,
    setStreamState,
    SearchQuery,
    setSearchQuery,
    SelectedVideoStreamId,
    setSelectedId,
    UserPrompt,
    setUserPrompt,
    ai_Reply,
    setReply
  };

  return (
    <AppContext.Provider value={contextValue}>
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
    </AppContext.Provider>
  );
}

export default App;
