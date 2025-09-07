import { useEffect, useState } from "react"
import Styles from "./ComponentHandler.module.css"
import {motion} from "framer-motion"
import ToogleButton, { Recommendation } from "../../src/components/handlerComponentsPart1/Comp_Collection"


export default function ComponentHandler(){
    // will track Ai-reply and Ai_assisform elemnt
    let [isTxtAreaActive,setTxtActivation] = useState(false);
    // will track rcommenadtionn video filed via toogle button
    let [showRecommendationTab,setReccoamendation] = useState(false)
    return(
        <>
            <div className={Styles.component_handler}>
                <Ai_Reply
                setActive={setTxtActivation}
                textActive={isTxtAreaActive}
                />
                <Ai_assistForm 
                setActive={setTxtActivation}
                textActive={isTxtAreaActive}/>
                <ToogleButton isToggled={showRecommendationTab} setIsToggled={setReccoamendation}/>
                <Recommendation
                showRec={showRecommendationTab}
                />
            </div>
        </>
    )
}


function Ai_assistForm ({textActive,setActive}){
    
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