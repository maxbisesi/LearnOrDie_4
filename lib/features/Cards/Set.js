import React from 'react';
import './GalleyStyle.css';

export default function Set(props) {
    return(
        <div className="cardset-set">
            {props.setname} - {props.size}
            <br/>
            "{props.description}"
        </div>
    );
}