// import { Ai_assistForm } from "../ComponentHandler/ComponentHandler";
import { useContext } from "react";
import { AppContext } from "../App";
import ToogleButton from "../components/handlerComponentsPart1/Comp_Collection";
import { Fetch_Data } from "../JS_Script/Fetch_Script.js";
import { motion } from "framer-motion";
import Styles from "./Page.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"


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
        isTxtAreaActive,
        setTxtActivation, 
        IsVideoSearch, 
        setSearchVideo,
        SelectedVideoStreamId,
        setSelectedId,
        setReply,
        setHTML,
        isUSer_Note, setNote,
        setSearchQuery,
        isWidthLimit

    }
         = useContext(AppContext);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userInput = formData.get('UserPrompt');
        console.log('User input:', userInput);
        Fetch_Data({
            userPromt : userInput,
            videoId : SelectedVideoStreamId ? SelectedVideoStreamId : null
        }).then(res=> res.json())
        .then(res=>{

            const MainData = res?.DataReceive;
            console.log(MainData)
            try{

            setReply(MainData?.message)

            switch(MainData.prompt_Type){
                // will handle link path 
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
                    setSearchQuery(userInput);
                    return;
                }
            }
            console.log(res)
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
                onClick={()=> setTxtActivation(true)}
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
                className={Styles.textarea}
                placeholder="type here"
                id="userQuery"
                name="UserPrompt"></motion.textarea>
                <button type="submit">search</button>
            </motion.form>
        </>
    )
}

export {Ai_assistForm}