import React from 'react';
import './CardSetStyle.css';

export default function Set(props) {
    return(
        <div className="cardset-set">
            {props.size}
        </div>
    );
}