import React,{ useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import shark1 from './SharkSprites/spritesheet.png';

export default function Shark(props) { 
    const sharkPosition = useSelector(state => state.gameSlice.sharkPosition);

    return (
        <div
            style={{
                position:'relative',
                top:sharkPosition[1],
                left:sharkPosition[0],
                backgroundImage:`url('${shark1}')`,
                backgroundPosition: '0 0',
                width: '518px',
                height: '1088px'

            }}
        />
    );
} 