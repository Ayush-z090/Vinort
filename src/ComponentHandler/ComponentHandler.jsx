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
import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar.jsx"

export default function ComponentHandler(){
    let location= useLocation()
    // Get all state variables and setters from context
    const {
        isTxtAreaActive,
        setTxtActivation,
        showRecommendationTab,
        setReccoamendation,
        IsVideoSearch,
        setSearchVideo,
        setStreamState,
        SearchQuery,
        setSearchQuery,
    } = useContext(AppContext);
    
    return(
        <>
            <motion.div 
            animate={
                location.pathname === '/Search' ? {
                display:"flex",
                gap:"2rem",
                flexDirection:"column",
                backdropFilter: "blur(6px) brightness(0.5)"
                }:
                location.pathname === '/Stream' ? {backdropFilter: "blur(6px) brightness(0.5)"} : 
                location.pathname === "/Home" ? {paddingTop :"25vh"} :{ }
            }
            className={Styles.component_handler}>
                <Navbar/>
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


    const ai_base_value ={
        transform: "translate(-50%, 0)",
        height:"fit-content",
        padding:"2rem 1rem 1rem 1rem",
        
    }

    const {
        isTxtAreaActive,
        setTxtActivation, 
        ai_Reply,
        returnHTML,
        isUSer_Note,
        
        } = useContext(AppContext);

        useEffect(()=>{
            setTimeout(() => {
                console.log(true)
                if(isTxtAreaActive) setTxtActivation(false)
            }, 5000);
        })

    let [overflow_condition,setOverflow] = useState(false)

    console.log(returnHTML)
    useEffect(()=>{
        let num  = getLineCount(document.getElementById("test"))
        setOverflow(num >=5)
    },[])
    return(
        <>
            <motion.div
            initial={{}}
            animate={
                isUSer_Note ? {
                    top: "-14rem",
                    transform: "translate(-50%, 50%)",
                    height: "69vh",
                    justifyContent: "start",
                    gap:"1rem",
                    alignItems:"start",
                    padding:"2rem 2.4rem"
                } : isTxtAreaActive ? {top :"-2%"} : ""
            }
            className={Styles.ai_reply}>
                {isUSer_Note ?  returnHTML.map(data=> <ELemntGEn key={data.head} head={data.head} body={data.body}/>) : ""}
                <motion.p
                initial={{overflow:"initial"}}
                animate={
                    overflow_condition ?{
                        overflow:  "scroll",
                        height:"5rem"

                    }:{}
                }
                id="test">{ isUSer_Note ? "" : ai_Reply}</motion.p>
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

function ELemntGEn({head,body}){
    return(
        <>
            <div className={Styles.returnParent}>
                <h1>{head}</h1>
                {body.map(points=> <li>{points}</li>)}
            </div>
        </>
    )
}

export {Ai_Reply,getLineCount}