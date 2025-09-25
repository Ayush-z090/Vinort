// import { Ai_assistForm } from "../ComponentHandler/ComponentHandler";
import { useContext } from "react";
import { AppContext, triakObj } from "../App";
import ToogleButton from "../components/handlerComponentsPart1/Comp_Collection";
import { Fetch_Data } from "../JS_Script/Fetch_Script.js";
import { motion } from "framer-motion";
import Styles from "./Page.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { LoadingDots } from "../components/handlerComponentPart2/comp_collectio2.jsx";


export default function Home(){
    return(<>
        <Ai_assistForm />
        <ToogleButton/>
    </>)
}


function Ai_assistForm({sty={}}){

    const Location = useLocation();
    const Navigate = useNavigate();

    const { 
        setTxtActivation, 
        SelectedVideoStreamId,
        setSelectedId,
        setReply,
        setHTML,
        isUSer_Note, setNote,
        setSearchQuery,
        isWidthLimit,
        ai_Reply

    }
         = useContext(AppContext);
    
    const handleFormSubmit = (e) => {
        setReply(<LoadingDots/>)
        isUSer_Note ? setNote(false) : ""
        e.preventDefault();

        const formData = new FormData(e.target);
        const userInput = formData.get('UserPrompt');
        Fetch_Data({
            userPromt : userInput,
            videoId : SelectedVideoStreamId ? SelectedVideoStreamId : null
        }).then(res=> res.json())
        .then(res=>{

            const MainData = res?.DataReceive;
            try{

                MainData.prompt_Type !== "help" ? setReply(MainData?.message)  : setReply(ai_Reply)

            switch(MainData.prompt_Type){
                // will handle link path 
                case "help" : {
                    setTxtActivation(false)

                    
                    const aiIndex = triakObj.findIndex(item => item.head === "Ai_message");

                    if (aiIndex !== -1) {
                    // If "Ai_message" object exists, push message into its body array
                    triakObj[aiIndex].body = [MainData?.message];
                    } else {
                    // If not found, create a new object at the beginning
                    triakObj.unshift({
                        head: "Ai_message",
                        body: [MainData?.message]
                    });
                    }

                    setHTML(triakObj);
                    setNote(true)
                    return;
                }
                case "link" : {
                    setSelectedId(MainData.passed_URL_ID);
                    Navigate("/Stream")
                    return ;
                }
                // will handle videoAI talk
                case "VideoDetail" :{
                    if(Location.pathname === "/Stream"){
                        setNote(true)
                        setHTML(MainData.HTML)
                    }
                    return;
                }
                // will handle user search with yt search api
                case "search": {
                    if(Location.pathname === "/Home"){
                    Navigate("/Search")    
                    }
                    localStorage.setItem("query",userInput)
                    setSearchQuery(userInput);
                    return;
                }
            }
        }catch(error){
            setReply("cant connect ai at the momment")
            console.log(`${res?.message} \n ${res?.errorType}`)
        }
            
            }
        )
        
    };

    return(
        <>
            <motion.form
            id="_form"
            style={isWidthLimit ? {width:"85vw",...sty}:{...sty}}
            className={Styles.form}
            onSubmit={ handleFormSubmit}>
                <motion.textarea
                onClick={()=> !isUSer_Note ? setTxtActivation(true) : ""}
                onKeyDown={(e)=>{
                    if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                    }
                }}
                whileFocus={
                    {
                     height:"4rem"
                    }
                }
                onFocus={()=>ai_Reply ? setReply( ": type ur Query") :""}

                className={Styles.textarea}
                placeholder="type here"
                id="userQuery"
                name="UserPrompt">
                </motion.textarea>
                <button type="submit">search</button>
            </motion.form>
        </>
    )
}

export {Ai_assistForm}