import { useEffect, useState, useContext } from "react"
import Styles from "./ComponentHandler.module.css"
import {motion} from "framer-motion"
import ToogleButton, { Recommendation, UserSearchCards, VideoStreamer } from "../components/handlerComponentsPart1/Comp_Collection"
import { Page_Content } from "../components/SearchPage/SearchPage";
import { AppContext } from "../App.jsx"
import DetailViewClickCard, { E_Dis } from "../components/handlerComponentPart2/comp_collectio2.jsx";
import { Fetch_Data } from "../JS_Script/Fetch_Script.js";

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
                    <Vidfunction/>
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

    let {SelectedVideoStreamId} = useContext(AppContext)
    let [fetchData,setData] = useState([])
    let [ClickState,setClickState] =  useState(false)
    let API_KEY = import.meta.env.VITE_YT_API_KEY
    let API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${SelectedVideoStreamId}&key=${API_KEY}`

    let FetchFunction = async ()=>{
        try{
            let FETCHData = await fetch(API_URL);
            let data = await FETCHData.json();
            console.log(data.error.code === 403)
            if (data.error.code === 403){
                throw new Error("yt api limit reach")
            }
            setData(Object.keys(data).includes("items") ? data?.items[0] : data)
        }catch(e){
            console.error(`unable to fetch the data\nerror:\t${e}`)
        }
    }
    useEffect(()=>{
        FetchFunction()
    },[SelectedVideoStreamId])


    return(
        <>
            <div
            style={{
                padding: ".6rem 0"
            }}
            className={Styles.FuncionButtons}>
                <div className={Styles.buttonCard}>
                    <DetailViewClickCard setState={setClickState} state={ClickState}/>
                    <Ai_assistForm sty={{"margin":0}}/>
                </div>
                {ClickState ? <E_Dis content={fetchData?.snippet?.description}/> : ""}
            </div>
        </>
    )
}

function Ai_assistForm({sty={}}){
    const { 
        isTxtAreaActive,
        setTxtActivation, 
        IsVideoSearch, 
        setSearchVideo,UserPrompt,
        setUserPrompt,
        videoStreamState,
        SelectedVideoStreamId,
        setSelectedId,
        setStreamState,
        setReply
    }
         = useContext(AppContext);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userInput = formData.get('UserPrompt');
        console.log('User input:', userInput);
        Fetch_Data({
            userPromt : userInput,
            videoStreamState : videoStreamState,
            videoId : SelectedVideoStreamId ? SelectedVideoStreamId : null
        }).then(res=> res.json())
        .then(res=>{

            const MainData = res?.DataReceive;

            try{

            setReply(MainData?.message ?? MainData?.vid_Related_res)
            
            switch(MainData.prompt_Type){
                case "link" : {
                    setSelectedId(MainData.passed_URL_ID);
                    setSearchVideo(false);
                    setStreamState(true);
                }
            }
            console.log(res)
        }catch(error){
            // setReply(`${MainData.message} \n ${MainData.errorType}`)
        }
            
            }
        )
        
    };

    return(
        <>
            <motion.form
            id="_form"
            style={sty}
            className={Styles.form}
            onSubmit={handleFormSubmit}>
                <motion.textarea
                onClick={()=> setTxtActivation(true)}
                whileFocus={
                    {
                     height:"4rem"
                    }
                }
                className={Styles.textarea}
                placeholder="type here"
                id="userQuery"
                name="UserPrompt"></motion.textarea>
                <button type="submit">search</button>
            </motion.form>
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
                <motion.pre
                initial={{overflow:"initial"}}
                animate={
                    overflow_condition ?{
                        overflow:  "scroll",
                        height:"5rem"

                    }:{}
                }
                id="test">{ai_Reply}</motion.pre>
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

