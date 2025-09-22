import {  useContext } from "react"
import { motion } from "framer-motion"
import Styles from "./Comp_Collection.module.css"
import { Page_Content } from "../SearchPage/SearchPage"
import { AppContext } from "../../App.jsx"

export default function ToogleButton() {
    const { showRecommendationTab, setReccoamendation ,isWidthLimit} = useContext(AppContext);

    const handleToggle = () => {
        setReccoamendation(!showRecommendationTab)
    }

    return (
        <div className={Styles.toggleContainer}>
        <motion.button
            className={`${Styles.toggleButton} ${showRecommendationTab ? Styles.toggleOn : Styles.toggleOff}`}
            onClick={handleToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                boxShadow: showRecommendationTab 
                    ? "0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)" 
                    : "0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)"
            }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={Styles.toggleSlider}
                animate={{
                    x: showRecommendationTab ? 24 : 0,
                    backgroundColor: showRecommendationTab ? "#22c55e" : "#ef4444"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </motion.button>
        
        <span className={Styles.toggleLabel} style={isWidthLimit ? {fontSize:".8rem"}:{}}>
        video reccomandation is {showRecommendationTab ? "ON" : "OFF"}
        </span>
    </div>
)
}

function Recommendation(){
    const { showRecommendationTab } = useContext(AppContext);
    
    return(
        
            <motion.div
            animate={showRecommendationTab ? {bottom:0} : {}}
            className={Styles.RecommendationContainer}>
                <Page_Content mode="local" />
            </motion.div>
        
    )
}

function UserSearchCards({ParentSty={}}){
    const { isWidthLimit } = useContext(AppContext);
   
    return(
        <>
            <div
            style={isWidthLimit ? {height:"78vh",...ParentSty} : {...ParentSty}}
            className={Styles.search_Cards_container} >
                <Page_Content maxResultNum={35}  mode="search"/>
            </div>
        </>
    )
}


function VideoStreamer({sty={}}){
    const { SelectedVideoStreamId } = useContext(AppContext);

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
                    src={`https://www.youtube.com/embed/${SelectedVideoStreamId}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>

        </>
    )
}

export {Recommendation,UserSearchCards,VideoStreamer}