import React, { useState, useRef } from "react";
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './MathModuleStyle.css';
// import gsap from 'gsap';
// import KeyboardEventHandler from 'react-keyboard-event-handler';

export default function MathModule(props) {
    function handleClick(e) {
        props.insertCharacter(e.target.name);
    }   

    let unicodeCharacters = ['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','¼','½','¾','₀','₁','₂','₃','₄','₅','₆','₇','₈','₉'];
    const buttons = unicodeCharacters.map( (c,i) => {
        return <input key={i} className="module-button" type="button" name={c} value={c} onClick={handleClick}/>;
    });
    
    return (
        <div className="module-container">
            {buttons}
        </div>
    );
}