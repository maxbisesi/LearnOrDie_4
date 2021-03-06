import React, { useState, useRef } from "react";
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './ModuleStyle.css';
// import gsap from 'gsap';
// import KeyboardEventHandler from 'react-keyboard-event-handler';
import Utils from '../../Utils';

export default function MathModule(props) {
    const [subMod,setSubMod] = useState('math');
    const mathIcon = 'π';
    const triangleIcon = '▲';
    console.log(`Math Module: ${subMod}`);
    function handleUnicodeClick(e) {
        props.insertCharacter(e.target.name);
    }   

    function handleTriangleClick(e){
        console.log(`Math module: ${e.target.value} |`);
        props.addShape(e.target.name);
    }

    let unicodeCharacters = ['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','¼','½','¾','₀','₁','₂','₃','₄','₅','₆','₇','₈','₉','∞','π'];
    const unicodeButtons = unicodeCharacters.map( (c,i) => {
        return <input key={i} className="unicode-button" type="button" name={c} value={c} onClick={handleUnicodeClick}/>;
    });

    let triangles = ['Equilateral','Right','Circle','Square'];
    const triangleButtons = triangles.map( (c,i) => {
        return <input id={Utils.createCategoryId(c)} key={i} className="triangle-button" type="button" name={c} value={c} onClick={handleTriangleClick}/>;
    });
    
    return (
        <div id="mathmodule" className="module-container">
            {subMod === 'math' ? unicodeButtons : triangleButtons}
            <div className="module-icon-container">
                <span id="mathsubmod" name="math" className="module-icon" onClick={ () => { setSubMod('math'); }}>{mathIcon}</span>
                <span id="shapesubmod" name="triangle" className="module-icon" onClick={ () => { setSubMod('triangle'); }}>{triangleIcon}</span>
            </div>
        </div>
    );
}