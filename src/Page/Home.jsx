// import { Ai_assistForm } from "../ComponentHandler/ComponentHandler";
import { useContext } from "react";
import { AppContext } from "../App";
import ToogleButton from "../components/handlerComponentsPart1/Comp_Collection";
import { Fetch_Data } from "../JS_Script/Fetch_Script.js";
import { motion } from "framer-motion";
import Styles from "./Page.module.css";
import { useNavigate } from "react-router-dom";

export default function Home(){
    return(<>
        <Ai_assistForm />
        <ToogleButton/>
    </>)
}


function Ai_assistForm({sty={}}){

    const Navigate = useNavigate();

    const { 
        isTxtAreaActive,
        setTxtActivation, 
        IsVideoSearch, 
        setSearchVideo,
        UserPrompt,
        setUserPrompt,
        SelectedVideoStreamId,
        setSelectedId,
        setStreamState,
        setReply,
        setHTML,
        isUSer_Note, setNote
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
            console.log(MainData.HTML)
            try{

            setReply(MainData?.message)
            console.log(MainData?.message)
            switch(MainData.prompt_Type){
                case "link" : {
                    setSelectedId(MainData.passed_URL_ID);
                    Navigate("/Stream")
                    return ;
                }
                case "VideoDetail" :{
                    setNote(true)
                    setHTML(MainData.HTML)
                }
            }
            console.log(res)
        }catch(error){
            // setReply(`${MainData.message} \n ${MainData.errorType}`)
        }
            
            }
        )
        
    };

    return(
        <>
            <motion.form
            id="_form"
            style={sty}
            className={Styles.form}
            onSubmit={handleFormSubmit}>
                <motion.textarea
                onClick={()=> setTxtActivation(true)}
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