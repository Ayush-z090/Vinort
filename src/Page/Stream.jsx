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
