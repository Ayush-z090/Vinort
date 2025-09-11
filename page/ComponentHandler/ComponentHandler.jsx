import { useEffect, useState } from "react"
import Styles from "./ComponentHandler.module.css"
import {motion} from "framer-motion"
import ToogleButton, { Recommendation, UserSearchCards, VideoStreamer } from "../../src/components/handlerComponentsPart1/Comp_Collection"
import { Page_Content } from "../../src/components/SearchPage/SearchPage";


export default function ComponentHandler(){
    // will track Ai-reply and Ai_assisform elemnt
    let [isTxtAreaActive,setTxtActivation] = useState(false);
    // will track rcommenadtionn video filed via toogle button
    let [showRecommendationTab,setReccoamendation] = useState(false)
    // will track of the situaiton when user want to search for the video 
    let [IsVideoSearch,setSearchVideo] = useState(false) // change it to set searchpage ViewPort
    // will track when video is streaming
    let [videoStreamState , setStreamState] = useState(true); // change it to set VideoStream viewPort
    // will track the userSearch value..
    let [SearchQuery,setSearchQuery] = useState("after effects")
    
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
                videoStreamState ? {paddingTop : "6vh",backdropFilter: "blur(6px) brightness(0.5)"} : {}
            }
            className={Styles.component_handler}>

                
                {videoStreamState ? <VideoDisplay Query={SearchQuery}/> : ""}
                <Ai_Reply
                setActive={setTxtActivation}
                textActive={isTxtAreaActive}
                />

                {IsVideoSearch ? <UserSearchCards userSearhQuery={SearchQuery}/> : ""}

                {videoStreamState ? "" :<Ai_assistForm 
                IsVideoSearch={IsVideoSearch}
                setVideoSearch={setSearchVideo}
                setActive={setTxtActivation}
                textActive={isTxtAreaActive}/>}

               { IsVideoSearch || videoStreamState ? "" : <ToogleButton isToggled={showRecommendationTab} setIsToggled={setReccoamendation}/>}

                <Recommendation
                showRec={showRecommendationTab}
                />
            </motion.div>
        </>
    )
}

function VideoDisplay({Query}){
    return(
        <>
            <div className={Styles.Display_stream}>
                <VideoStreamer/>
                <Page_Content 
                maxResultNum={10} 
                sty={
                        {
                            width: "32%",
                            padding: "1rem clamp(1rem, 7vw, 10rem)",
                            gap: "3rem",
                            height:"96vh"
                        }
                    }
                searchValue={Query}/>
                
            </div>
        </>
    )
}


function Ai_assistForm ({textActive,setActive,IsVideoSearch,setVideoSearch}){
    
    return(
        <>
            <motion.form
            className={Styles.form}>
                <motion.textarea
                onClick={()=> setActive(!textActive)}
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

function Ai_Reply({textActive,setActive}){

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
                    top:textActive ? "-2%" : undefined,
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

