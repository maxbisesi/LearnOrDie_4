import React from 'react';
import './CardSetStyle.css';

export default function Set(props) {
    return(
        <div className="cardset-set">
            {props.size} - {props.setname}
            "{props.description}"
        </div>
    );
}