import React, { useState } from "react";
import './GalleyStyle.css';
import classNames from "classnames";

export default function Set(props) {
    console.log(' --- Set --- ');
    const [ isClicked, setIsClicked ] = useState(false);

    let btnClass = classNames({
        "cardset-set": true,
        "cardset-set-clicked": isClicked 
    });

    return(
        <div onClick={(e) => setIsClicked(click => !click)} data-setid={props.set_id} className={btnClass}>
            {props.setname} - {props.size}
            <br/>
            "{props.description}"
        </div>
    );
}