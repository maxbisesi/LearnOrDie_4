import React,{ useState } from "react";
import { handlePlayerMovement } from './Movement';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import ninjasprite from './PlayerSprites/ninja_run.png';

function Player(props) { 
    const playerPosition = useSelector(state => state.gameSlice.playerPosition);

    return (
    <div
        style={{
            position:'relative',
            top:playerPosition[1],
            left:playerPosition[0],
            backgroundImage:`url('${ninjasprite}')`,
            backgroundPosition: '0 0',
            width: '133px',
            height: '159px'
        }}
    />);
    
} 

export default handlePlayerMovement(Player);