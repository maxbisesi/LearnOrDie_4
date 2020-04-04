import React,{ useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Hammerhead from '../../Hammerhead';
import Urchin from '../../Urchin';
import Player from '../../Player';
import { WORLD_SIZE, tiles, OBJECT_SIZE }from '../../../../config'
import './UnderWaterWorldStyle.css'
import { changeUrchinPosition } from "../../gameSlice";
import bg1 from './underwaterworld4/layers/1.png';
import { TimelineMax } from 'gsap';

export default function UnderWaterWorld(props) {
    const dispatch = useDispatch();

    function handleMouseMove(e) {
        console.log(`clientX clientY: ${e.clientX}, ${e.clientY}`);
        const urX = e.clientX - 50;
        const urY = e.clientY - 50;
        const payload = {'urchinPosition':[urX,urY]};
        // dispatch(changeUrchinPosition(payload));
    }


    return (
        <div className="underwater-layer layer-1">
            <Urchin />
        </div>
    );
}