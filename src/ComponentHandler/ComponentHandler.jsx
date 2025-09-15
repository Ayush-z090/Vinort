import { useEffect, useState, useContext } from "react"
import Styles from "./ComponentHandler.module.css"
import {motion} from "framer-motion"
import  { Recommendation } from "../components/handlerComponentsPart1/Comp_Collection"
import { AppContext } from "../App.jsx"
import { Route,Routes } from "react-router-dom"
import MainPage from "../components/Mainpage/MainPage.jsx"
import Home from "../Page/Home.jsx"
import Search from "../Page/Search.jsx"
import Stream from "../Page/Stream.jsx"
export default function ComponentHandler(){
    // Get all state variables and setters from context
    const {
        isTxtAreaActive,
        setTxtActivation,
        showRecommendationTab,
        setReccoamendation,
        IsVideoSearch,
        setSearchVideo,
        videoStreamState,
        setStreamState,
        SearchQuery,
        setSearchQuery
    } = useContext(AppContext);
    
    return(
        <>
            <motion.div 
            animate={
                IsVideoSearch ? {
                // paddingTop: "10vh" ,
                display:"flex",
                gap:"2rem",
                flexDirection:"column",
                backdropFilter: "blur(6px) brightness(0.5)"
                }:
                videoStreamState ? {paddingTop : "5vh",backdropFilter: "blur(6px) brightness(0.5)"} : {}
            }
            className={Styles.component_handler}>
                <Ai_Reply/>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/Home' element={<Home/>}/>
                    <Route path='/Search' element={<Search/>}/>
                    <Route path="/Stream" element={<Stream/>}/>
                </Routes>

                <Recommendation/>
            </motion.div>
        </>
    )
}


function Ai_Reply(){
    const {
        isTxtAreaActive,
        setTxtActivation, 
        ai_Reply
        } = useContext(AppContext);

    let [overflow_condition,setOverflow] = useState(false)

    useEffect(()=>{
        let num  = getLineCount(document.getElementById("test"))
        setOverflow(num >=5)
    },[])
    return(
        <>
            <motion.div
            initial={{}}
            onClick={()=> setTxtActivation(false)}
            animate={
                {
                    top:isTxtAreaActive ? "-2%" : undefined,
                }
            }
            className={Styles.ai_reply}>
                <motion.p
                initial={{overflow:"initial"}}
                animate={
                    overflow_condition ?{
                        overflow:  "scroll",
                        height:"5rem"

                    }:{}
                }
                id="test">{ai_Reply}</motion.p>
            </motion.div>
        </>
    )
}


function getLineCount(el) {
    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);
    const height = el.getBoundingClientRect().height;
    return Math.round(height / lineHeight);
  }


export {Ai_Reply,getLineCount}