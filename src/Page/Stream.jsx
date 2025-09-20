import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Page_Content } from "../components/SearchPage/SearchPage";
import DetailViewClickCard, { E_Dis } from "../components/handlerComponentPart2/comp_collectio2.jsx";
import { VideoStreamer } from "../components/handlerComponentsPart1/Comp_Collection";
import Styles from "./Page.module.css";
import { Ai_assistForm } from "./Home.jsx";


export default function Stream(){
    return(
        <>
            <VideoDisplay/>
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
                mode="auto"
                maxResultNum={10} 
                sty={
                        {
                            width: "100%",
                            padding: "1rem clamp(1rem, 7vw, 10rem)",
                            gap: "3rem",
                            height:"84vh"
                        }
                    }
                />

                </div>
            </div>
        </>
    )
}


function Vidfunction(){

    let {SelectedVideoStreamId,setReply} = useContext(AppContext)
    let [fetchData,setData] = useState([])
    let [ClickState,setClickState] =  useState(false)
    let API_KEY = import.meta.env.VITE_YT_API_KEY
    let API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${SelectedVideoStreamId}&key=${API_KEY}`

    // in-memory cache for video details by videoId
    if(!window.__ytVideoDetailCache){ window.__ytVideoDetailCache = new Map(); }
    let videoDetailCache = window.__ytVideoDetailCache;

    let FetchFunction = async ()=>{
        try{
            // use cache if available for current SelectedVideoStreamId
            const cached = videoDetailCache.get(SelectedVideoStreamId);
            if(cached){
                console.log("catch")
                setData(cached);
                return;
            }
            let FETCHData = await fetch(API_URL);
            if(!FETCHData.ok) throw new Error("yt api limit reach");
            let data = await FETCHData.json();

            // if (data.error.code === 403){
            //     throw new Error("yt api limit reach")
            // }
            const normalized = Object.keys(data).includes("items") ? data?.items[0] : data;
            videoDetailCache.set(SelectedVideoStreamId, normalized);
            setData(normalized)
            
        }catch(e){
            console.log(`unable to fetch the data\nerror:\t${e}`)
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
