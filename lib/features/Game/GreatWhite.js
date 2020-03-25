import React,{ useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import greatwhite from './SharkSprites/GreatwhiteSprite.png';
import { GREATWHITE_SIZE } from '../../config';
export default function GreaWhite(props) { 
    const sharkPosition = useSelector(state => state.gameSlice.sharkPosition);

    return (
        <div
            style={{
                position:'relative',
                top:sharkPosition[1],
                left:sharkPosition[0],
                backgroundImage:`url('${greatwhite}')`,
                backgroundPosition: '0 0',
                width: GREATWHITE_SIZE.width,
                height: GREATWHITE_SIZE.height
            }}
        />
    );
} 