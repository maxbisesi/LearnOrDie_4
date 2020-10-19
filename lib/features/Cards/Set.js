import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './GalleyStyle.css';
import classNames from "classnames";
import { studySet, asyncDeleteCardSet } from './cardSlice';

export default function Set(props) {
    console.log(' --- Set --- ');
    const [ isClicked, setIsClicked ] = useState(false);
    const dispatch = useDispatch();
    let setClasses = classNames({
        "cardset-set": !isClicked,
        "cardset-set-clicked": isClicked,
        "cardset-beingstudied": props.beingStudied
    });

    let setButton = classNames({
        "cardset-button": !isClicked,
        "cardset-button-show": isClicked
    });

    function study() {
        let idnum = parseInt(props.set_id);
        // console.log(`idnum: ${idnum}`);
        dispatch(studySet(idnum));
        // Cards loaded ! 
        const res = confirm('Cards loaded ! Redirect to Testing ?');
        if( res === true) { props.setTab(2); }
    }

    async function deleteSet() {
        const res = confirm(`Delete this Card Set: ${props.set_id}?\nThe individual cards will not be deleted.`);
        if( res === true) { 
            dispatch(asyncDeleteCardSet(props.set_id)); 
        }
        
    }

    return(
        <div onClick={() => setIsClicked(click => !click)} data-setid={props.set_id} className={setClasses}>
            <span id="cardsetname">{props.setname}</span> - <span id="cardsetsize">{props.size}</span>
            <br/>
            <span id="cardsetdescription">{props.description}</span>
            <input id="studysetbutton" className={setButton} type="button" value="Study" onClick={study} />
            <input id="deletesetbutton" className={setButton} type="button" value="Delete" onClick={deleteSet} />
            <input id="sharesetbutton" className={setButton} type="button" value="Share"  />
            <input id="editsetbutton" className={setButton} type="button" value="Edit" />
        </div>
    );
}