import React,{ useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import './UnderWaterWorldStyle.css'
import Urchin from '../../Urchin';
import bg1 from './underwaterworld4/layers/1.png';
import { gsap } from 'gsap';

export default function UnderWaterWorld(props) {
    const dispatch = useDispatch();

    function handleMouseMove(e) {
        console.log(`clientX clientY: ${e.clientX}, ${e.clientY}`);
        const urX = e.clientX - 50;
        const urY = e.clientY - 50;
        const payload = {'urchinPosition':[urX,urY]};
        // dispatch(changeUrchinPosition(payload));
    }

    const uwref = useRef(null);

    useEffect(()=>{
        const layer1TL = gsap.timeline({repeat: -1});
        layer1TL.from(uwref.current,{x:"+=500", duration:15});
        layer1TL.play();
        console.log(layer1TL.time()); 
    });

    return (
        <div ref={uwref} className="underwater-layer layer-1">
            <Urchin />
        </div>
    );
}