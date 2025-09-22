import { useContext, useState } from "react";
import Styles from "./Navbar.module.css";
import { AppContext } from "../../App";
import FullLogo from "../../assets/FullLogo.jpg";

export default function Navbar(){
    const { isTxtAreaActive, setTxtActivation ,isUSer_Note, setNote,} = useContext(AppContext);

    const onClickAI = () => {
        if (isTxtAreaActive) {
            setTxtActivation(false);
        } else {
            setTxtActivation(true);
            setNote(false);
        }
    };

    const onClickNote = () => {
        if (isUSer_Note) {
            setNote(false);
        } else {
            setNote(true);
            setTxtActivation(false);
        }
    };

    return <>
        <nav className={Styles.navbar}>
            <div className={Styles.logo}><img src={FullLogo} alt="logo" className={Styles.logoImg} /></div>
            <div className={Styles.centerControls}>
                <button className={`${Styles.navBtn} ${isTxtAreaActive ? Styles.active : ""}`} onClick={onClickAI}>AI</button>
                <button className={`${Styles.navBtn} ${isUSer_Note ? Styles.active : ""}`} onClick={onClickNote}>Note</button>
                {/* <button className={Styles.navBtn}>Explore</button> */}
            </div>
        </nav>
    </>;
}


