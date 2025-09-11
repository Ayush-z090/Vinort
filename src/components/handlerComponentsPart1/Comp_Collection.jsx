import { useState } from "react"
import { motion } from "framer-motion"
import Styles from "./Comp_Collection.module.css"
import { Page_Content } from "../SearchPage/SearchPage"

export default function ToogleButton({isToggled,setIsToggled}) {

    const handleToggle = () => {
        setIsToggled(!isToggled)
    }

    return (
        <div className={Styles.toggleContainer}>
        <motion.button
            className={`${Styles.toggleButton} ${isToggled ? Styles.toggleOn : Styles.toggleOff}`}
            onClick={handleToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                boxShadow: isToggled 
                    ? "0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)" 
                    : "0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)"
            }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={Styles.toggleSlider}
                animate={{
                    x: isToggled ? 24 : 0,
                    backgroundColor: isToggled ? "#22c55e" : "#ef4444"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </motion.button>
        
        <span className={Styles.toggleLabel}>
        video reccomandation is {isToggled ? "ON" : "OFF"}
        </span>
    </div>
)
}

function Recommendation({showRec,setReccomand}){
    
    return(
        
            <motion.div
            animate={showRec ? {bottom:0} : {}}
            className={Styles.RecommendationContainer}>
                <Page_Content/>
            </motion.div>
        
    )
}

function UserSearchCards({userSearhQuery = "python",ParentSty={},childSty={}}){
    return(
        <>
            <div className={Styles.search_Cards_container} style={ParentSty}>
                <Page_Content maxResultNum={5} searchValue={userSearhQuery}/>
            </div>
        </>
    )
}



function VideoStreamer({videoId,sty={}}){
    return(
        <>
            <div 
            style={sty}
                className={Styles.play_Element}>
                    <iframe 
                    style={{
                        position:"absolute",
                        width:"100%",
                        height:"100%",
                        top:0,
                        left:0,
                        objectFit:"cover"
                    }}
                    src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>

        </>
    )
}

export {Recommendation,UserSearchCards,VideoStreamer}