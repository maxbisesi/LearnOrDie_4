import React,{ useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import hammerhead from './SharkSprites/HammerheadSprite.png';

export default function Hammerhead(props) { 
    const sharkPosition = useSelector(state => state.gameSlice.sharkPosition);

    return (
        <div
            style={{
                position:'relative',
                top:sharkPosition[1],
                left:sharkPosition[0],
                backgroundImage:`url('${hammerhead}')`,
                backgroundPosition: '0 0',
                width: '257px',
                height: '124px'
            }}
        />
    );
} 