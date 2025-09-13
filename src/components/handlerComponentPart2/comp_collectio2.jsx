import { motion } from "framer-motion"
import Styles from "./comp_collection2.module.css"
import { getTimeAgo } from "../Cards/Card"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"

let SVGInfoIcon = ()=>{               
return (
    <>
        <svg 
            width="2rem" 
            height="2rem" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: 'pointer' }}
        >
            <motion.circle
                cx="12" 
                cy="12" 
                r="12" 
                fill="black"
                whileHover={{ 
                    scale: 1.1,
                    fill: "#333"
                }}
                whileTap={{ 
                    scale: 0.95,
                    fill: "#666"
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.text 
                x="12" 
                y="17" 
                textAnchor="middle" 
                fontSize="16" 
                fontWeight="600" 
                fill="white"
                fontFamily="Arial, Helvetica, sans-serif"
                style={{ fontStyle: 'normal',textTransform:"lowercase"}}
                // whileHover={{ 
                //     scale: 1.1,
                //     fill: "#fff"
                // }}
                // whileTap={{ 
                //     scale: 0.95,
                //     fill: "#ccc"
                // }}
                // transition={{ duration: 0.2 }}
            >
                i
            </motion.text>
        </svg>
    </>
)
}

export default function DetailViewClickCard(){

    let {SelectedVideoStreamId} = useContext(AppContext)
    let [fetchData,setData] = useState([])
    let API_KEY = import.meta.env.VITE_YT_API_KEY
    let API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${SelectedVideoStreamId}&key=${API_KEY}`

    let FetchFunction = async ()=>{
        try{
            let FETCHData = await fetch(API_URL);
            let data = await FETCHData.json();
            console.log(data)
        }catch(e){
            alert(`unable to fetch the data\nerror:\t${e}`)
        }
    }
    useEffect(()=>{
        FetchFunction()
    },[])
    return(
        <>
            <div className={Styles.CardBody}>
                {<SVGInfoIcon/>}
                about
            </div>
        </>
    )
}

function E_Dis({content,views,date}){

    let [isExpand,setExpand]= useState(false)
    return(
        <>
        <div className="DiscriptionBox" 
        style={{
            width:"100%",
            height: isExpand ? "fit-content": "10rem",
            backgroundColor:"var(--yt-spec-menu-background)",
            "fontFamily":"sans-serif",
            color:"white",
            marginTop:"1.2rem",
            boxSizing:"border-box",
            padding:".6rem 1rem 2.5rem 1rem",
            borderRadius:".7em",
            textTransform:"capitalize",
            fontWeight:"bold",
            fontSize:".97rem",
            position:"relative",
            overflow:"hidden"
        }}>
            <div className="Info_text"
            style={{
                display:"flex",
                gap:"1rem"
            }}
            >
                <p>{views}</p>
                <p>{getTimeAgo(date)}</p>
            </div>
            <div className="discription_content">
                <p
                style={{
                    fontSize:".89rem",
                    fontWeight:"300"
                }}
                >

                    {content}
                </p>
            </div>
            <p 
            aria-label="expand-element"
            style={{
                position:"absolute",
                bottom:".8rem",
                left:"1rem",
                cursor:"pointer",

            }}
            onClick={()=> setExpand(!isExpand)}
            >
                {isExpand ? "Show less":"Show more"}
            </p>
        </div>
        </>
    )
}
