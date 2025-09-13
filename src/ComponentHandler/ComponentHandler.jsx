import { useEffect, useState, useContext } from "react"
import Styles from "./ComponentHandler.module.css"
import {motion} from "framer-motion"
import ToogleButton, { Recommendation, UserSearchCards, VideoStreamer } from "../components/handlerComponentsPart1/Comp_Collection"
import { Page_Content } from "../components/SearchPage/SearchPage";
import { AppContext } from "../App.jsx"
import DetailViewClickCard from "../components/handlerComponentPart2/comp_collectio2.jsx";


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
                paddingTop: "10vh" ,
                display:"flex",
                gap:"2rem",
                flexDirection:"column",
                backdropFilter: "blur(6px) brightness(0.5)"
                }:
                videoStreamState ? {paddingTop : "5vh",backdropFilter: "blur(6px) brightness(0.5)"} : {}
            }
            className={Styles.component_handler}>

                
                {videoStreamState ? <VideoDisplay/> : ""}

                <Ai_Reply/>

                {IsVideoSearch ? <UserSearchCards/> : ""}

                {videoStreamState ? "" :<Ai_assistForm/>}

               { IsVideoSearch || videoStreamState ? "" : <ToogleButton/>}

                <Recommendation/>
            </motion.div>
        </>
    )
}

function VideoDisplay(){
    const { SearchQuery,SelectedVideoStreamId } = useContext(AppContext);
    
    return(
        <>
            <div className={Styles.Display_stream}>
                <div className={Styles.videoPart}>
                    <VideoStreamer/>
                    <div className={Styles.VideosFunctions}>
                        <Vidfunction/>
                        <Ai_assistForm sty={{"margin":0}}/>
                    </div>
                </div>
                <div className={Styles.search_Body}>
                    <h1>search result</h1>
                <Page_Content 
                maxResultNum={10} 
                sty={
                        {
                            width: "100%",
                            padding: "1rem clamp(1rem, 7vw, 10rem)",
                            gap: "3rem",
                            height:"96vh"
                        }
                    }
                />

                </div>
            </div>
        </>
    )
}

function Vidfunction(){

    return(
        <>
            <div className={Styles.FuncionButtons}>
                <DetailViewClickCard/>

            </div>
        </>
    )
}

function Ai_assistForm({sty={}}){
    const { isTxtAreaActive, setTxtActivation, IsVideoSearch, setSearchVideo } = useContext(AppContext);
    
    return(
        <>
            <motion.form
            style={sty}
            className={Styles.form}>
                <motion.textarea
                onClick={()=> setTxtActivation(!isTxtAreaActive)}
                whileFocus={
                    {
                     height:"4rem"
                    }
                }
                className={Styles.textarea}
                placeholder="type here"
                id="userQuery"
                name="UserPrompt"></motion.textarea>
                <button>search</button>
            </motion.form>
        </>
    )
}

function Ai_Reply(){
    const { isTxtAreaActive } = useContext(AppContext);
    let [overflow_condition,setOverflow] = useState(false)
    useEffect(()=>{
        let num  = getLineCount(document.getElementById("test"))
        setOverflow(num >=5)
        console.log(num >= 5)
    },[])
    console.log(overflow_condition)
    return(
        <>
            <motion.div
            initial={{}}
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
                id="test">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae rem ut ab architecto dolorum, quam ducimus recusandae corporis nulla! Nisi, minima! Nisi illo velit aliquid amet voluptas consequatur quas neque Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, assumenda! Fuga blanditiis ad consectetur facere ab expedita quas sunt? Impedit nesciunt excepturijhgk hgkjgjkgjggkgkgkkkkkkkkkkkkkkkkkkkkkkkk.</motion.p>
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

