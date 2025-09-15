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
            >
                i
            </motion.text>
        </svg>
    </>
)
}

export default function DetailViewClickCard({setState,state}){

    return(
        <>
            <div 
            onClick={()=>setState(!state)}
            className={Styles.CardBody}>
                {<SVGInfoIcon/>}
                about
            </div>
        </>
    )
}

function E_Dis({content}){
    
    // Function to detect and convert URLs to clickable links
    const formatDescription = (text) => {
        if (!text) return text;
        
        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        // Split text by URLs and create clickable links
        const parts = text.split(urlRegex);
        
        return parts.map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#3ea6ff",
                            textDecoration: "underline",
                            cursor: "pointer"
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(part, '_blank');
                        }}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return(
        <>
        <motion.div className="DiscriptionBox" 
        style={{
            width:"100%",
            height:"fit-content",
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
            <div className="discription_content">
                <p
                style={{
                    fontSize:".89rem",
                    fontWeight:"300"
                }}
                >

                    {content ? formatDescription(content) : "(Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nulla, iure ut, fugiat dolor culpa rem ipsum, minima maxime eaque repellendus laudantium et ipsa odio voluptas error? Corrupti, reprehenderit qui!Recusandae omnis fuga tenetur sapiente! Itaque modi voluptatum, deserunt numquam quis in cupiditate saepe atque, error nihil qui. Dicta nihil iusto assumenda incidunt temporibus veritatis consequatur, veniam fugiat officia quae?Alias illum vel unde maiores magnam asperiores odio accusamus, autem provident accusantium sapiente deserunt distinctio dolor? Labore, voluptates deserunt id, numquam est similique obcaecati repellendus assumenda facere magni necessitatibus. Quasi.Eos, distinctio et recusandae voluptatum labore obcaecati. Dicta quasi ut voluptatibus deserunt totam. Doloremque exercitationem adipisci tempora delectus voluptatum consectetur fugit repellat. Corporis sunt, incidunt neque odio asperiores velit quaerat?Blanditiis quibusdam unde delectus magnam asperiores reiciendis amet voluptate vel maxime, autem praesentium, enim laudantium? Fuga, ab nostrum deserunt corrupti laudantium quia libero aliquid reprehenderit quibusdam nobis, assumenda qui consequuntur?Officia amet aliquid error repudiandae, veritatis dolorum, exercitationem voluptas suscipit in laboriosam voluptatem voluptatibus consequuntur assumenda reiciendis animi id tenetur expedita! Totam sit placeat, et possimus laudantium vitae sunt nulla!Quas eligendi doloremque hic minima voluptas modi vero necessitatibus quam, ratione perspiciatis, molestiae laudantium delectus quisquam quaerat sit at totam! Laudantium pariatur sapiente enim praesentium ipsam ut commodi velit quam!Eum, explicabo beatae totam iure corporis velit saepe aspernatur esse aperiam ut inventore amet eos modi impedit quibusdam, tempore ipsum ullam facilis veritatis eaque! Eum tempore quo rerum obcaecati corrupti?)"}
                </p>
            </div>
        </motion.div>
        </>
    )
}
export {E_Dis}
