import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Style from "./SearchPage.module.css"
import SeacrchQuery_videoCard from "../Cards/Card"


export function Page_Content({maxResultNum=15}){


    let seachQueryRandom = Math.floor(Math.random() * JSON.parse(localStorage.getItem("UserChoosenCategoires")).length)

    let [SearchData,setData]= useState([]);
    let query= JSON.parse(localStorage.getItem("UserChoosenCategoires"))[seachQueryRandom]
    let API_KEY = import.meta.env.VITE_YT_API_KEY
    let API_URl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=rating&type=video&maxResults=${maxResultNum}&q=${query}&key=${API_KEY}`

    let FETCH_data =async ()=>{
        let FetchData = await fetch(API_URl)
        let DATA = await FetchData.json()
        setData(DATA.items)
        console.log(DATA.items)
    }

    useEffect(()=>{
        FETCH_data()
    },[])

    return(
        <>
        <div className={Style.SearchPage}>
            {SearchData?.map(cardData =>cardType(cardData))}
        </div>
        </>
    )
}
function cardType(data){
    //types
    // let CardTypes =["youtube#video","youtube#channel"]

    if (data?.id.kind === "youtube#video") return <SeacrchQuery_videoCard dataObject={data} key={data?.id.videoId} />
    // if (data?.id.kind === "youtube#channel") return <SeacrchQuery_ChannelCard dataObject={data} key={data?.id.videoId} />
}