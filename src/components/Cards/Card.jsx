import {  Link } from "react-router-dom"
import Styles from "../Cards/Card.module.css"
import { useState,useEffect } from "react"
import { motion } from "framer-motion"



export default function SeacrchQuery_videoCard({dataObject,action}){
    
    let [UserAvatar,setAvatar]= useState([])
    let API_KEY = import.meta.env.VITE_YT_API_KEY
    let API_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${dataObject?.snippet?.channelId}&key=${API_KEY}`



    let FetchUserData = async ()=>{
        try{
            let Fetch_Data = await fetch(API_URL)
            let Data = await Fetch_Data.json()
            setAvatar(Data.items[0].snippet.thumbnails)
            
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        FetchUserData()
    },[])
    return<>
        <motion.div
        onClick={action ? action : ()=>{""}}
        className={Styles.Card_container} 
        >

            <motion.div className={Styles.Popup}>
                    <DownPopUp dataObject={dataObject} UserAvatar={UserAvatar}/>
                    <span>{getTimeAgo(dataObject.snippet.publishedAt)}</span>

            </motion.div>
            <Link 
            to={action ? "":`/video/${dataObject?.id.videoId}`} 
            className={Styles.Thumbnail_ImgField} 
            aria-label="thumnal-video"
            >
                <img src={dataObject.snippet.thumbnails.high.url} alt="" />
            </Link>
            <div 
            className={Styles.feedDetails}
            >
                <Link
                style={{
                }}
                to={action ? "":`/video/${dataObject.snippet.categoryId}/${dataObject.id}`} 
                className={Styles.VideoTitle}>
                    
                    {dataObject.snippet.title}
                </Link>
            </div>
        </motion.div>
    </>
}


function TopPopUp({dataObject}){
    return(
        <>
            <p style={{fontSize:".92rem"}}>{formatViewCount(dataObject.statistics?.viewCount)}</p>

        </>
    )
}

function DownPopUp({dataObject,UserAvatar}){
    return(
        <>
        <Link to={`/${dataObject.snippet.channelId}`} className={Styles.ImgField_Icon_usrPic}>
            <img src={UserAvatar?.high?.url} alt="" />
        </Link>
        <p
        style={{
            fontSize:".8rem",
            padding:".3rem 0 0 0"
        }}
        >{dataObject.snippet.channelTitle}</p>
        </>
    )
}


function formatViewCount(views) {
  if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1) + 'B';
  }
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  }
  return views?.toString();
}

function getTimeAgo(isoDate) {
    const now = new Date();
    const pastDate = new Date(isoDate);
    const diff = now - pastDate;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = (now.getFullYear() - pastDate.getFullYear()) * 12 + 
                   (now.getMonth() - pastDate.getMonth());
    const years = Math.floor(months / 12);
    
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 120) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 2) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    if (days < 2) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    if (months < 2) return '1 month ago';
    if (months < 12) return `${months} months ago`;
    if (years < 2) return '1 year ago';
    
    return `${years} years ago`;
}

