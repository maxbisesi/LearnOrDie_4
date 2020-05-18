import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './GalleyStyle.css';
import classNames from "classnames";
import { createCardSet, studySet } from './cardSlice';

export default function Set(props) {
    console.log(' --- Set --- ');
    const [ isClicked, setIsClicked ] = useState(false);
    const dispatch = useDispatch();

    let setClasses = classNames({
        "cardset-set": !isClicked,
        "cardset-set-clicked": isClicked 
    });

    let setButton = classNames({
        "cardset-button": !isClicked,
        "cardset-button-show": isClicked
    });

    function study() {
        dispatch(studySet(props.set_id));
        props.setTab(1);
    }

    return(
        <div onClick={(e) => setIsClicked(click => !click)} data-setid={props.set_id} className={setClasses}>
            {props.setname} - {props.size}
            <br/>
                {props.description}
            <input className={setButton} type="button" value="Study" onClick={study} />
            <input className={setButton} type="button" value="Delete" onClick={(e) => { }} />
            <input className={setButton} type="button" value="Share"  />
            <input className={setButton} type="button" value="Edit" />
        </div>
    );
}