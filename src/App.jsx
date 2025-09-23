import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './components/Mainpage/MainPage';
import styles from './App.module.css';
import ComponentHandler from './ComponentHandler/ComponentHandler';
import VidBg from "./assets/BG.mp4"

// Create context for sharing state across components
export const AppContext = createContext();

let triakObj =[
  {
    'head': 'Overview of the App',
    'body': [
      'This web app allows you to search for YouTube videos or get guidance on how the app works using a single prompt.',
      'The app integrates AI to make interactions simple and fast.',
      'It is designed to be responsive and user-friendly, working smoothly across devices.'
    ]
  },
  {
    'head': 'How to Search Videos',
    'body': [
      'Type your query into the input field (e.g., "JavaScript tutorial").',
      'The AI will process your prompt and fetch relevant YouTube videos.',
      'Results are displayed with video titles, thumbnails, and links so you can quickly access content.'
    ]
  },
  {
    'head': 'Getting Help',
    'body': [
      'If you type "help" into the prompt, the app will show this guide.',
      'The help system explains available features and usage examples.',
      'It ensures new users can easily understand and navigate the platform.'
    ]
  },
  {
    'head': 'Features and Benefits',
    'body': [
      'Single prompt for both video search and app help — no need for multiple menus.',
      'Fast and optimized AI response time for smooth experience.',
      'Clean and minimal design for distraction-free video discovery.'
    ]
  },
  {
    'head': 'Future Improvements',
    'body': [
      'Planned refinements to improve AI response accuracy.',
      'Better personalization based on viewing history.',
      'Adding more interactive features like playlists and recommendations.'
    ]
  }
]

let defaultHTML =[{
  'head': 'Interacting with Videos',
  'body': [
    'Click on a video thumbnail to start playing it directly in the app.',
    'You can pause, play, skip, or adjust the volume using the built-in video controls.',
    'Switch between different related videos shown in the recommendations section.',
    'View additional video details such as title, description, and channel information below the player.',
    'Optionally expand to full-screen mode for an immersive experience.',
    'Use the AI prompt box while a video is playing to ask for summaries, transcripts, or related content without leaving the player.'
  ]
}]

function App() {
  // All hook variables moved from ComponentHandler
  // will track apperance of ai reply elemnt it will depent on the aiassistform elemnt 
  const [isTxtAreaActive, setTxtActivation] = useState(false);
  // will track rcommenadtionn video filed via toogle button
  const [showRecommendationTab, setReccoamendation] = useState(false);
  // will track if user is asking about notes realted to video
  const [isUSer_Note, setNote] = useState(false); // change it to set VideoStream viewPort
  // will track the userSearch value..
  const [SearchQuery, setSearchQuery] = useState(localStorage.getItem("query") ? "" : "");
  const [SelectedVideoStreamId , setSelectedId] = useState(undefined);

  const [isWidthLimit,setLimit] = useState(false)
  // set the message to tell user about the action that has taken by the instruction of the form
  const [ai_Reply,setReply] = useState("waiting for the userPrompt")
  const [returnHTML,setHTML] = useState(defaultHTML);
  if(!ai_Reply)setReply("watiting for the response")
  // Data caching for Page_Content to prevent unnecessary API calls
  const [searchDataCache, setSearchDataCache] = useState({});
  const [recommendationDataCache, setRecommendationDataCache] = useState(null);
  
  // Function to clear recommendation cache when user categories change
  const clearRecommendationCache = () => {
    setRecommendationDataCache(null);
  };
  // Context value containing all state and setters
  const contextValue = {
    isTxtAreaActive,
    setTxtActivation,
    showRecommendationTab,
    setReccoamendation,
    isUSer_Note, setNote,
    SearchQuery,
    setSearchQuery,
    SelectedVideoStreamId,
    setSelectedId,
    ai_Reply,
    setReply,
    returnHTML,
    setHTML,
    isWidthLimit,
    searchDataCache,
    setSearchDataCache,
    recommendationDataCache,
    setRecommendationDataCache,
    clearRecommendationCache
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
export {triakObj,defaultHTML}