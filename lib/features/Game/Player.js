import React,{ useState } from "react";
import { handlePlayerMovement } from './PlayerMovement';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import ninjasprite from './PlayerSprites/ninja_run.png';
import { NINJA_SIZE } from '../../config'

function Player(props) { 
    const playerPosition = useSelector(state => state.gameSlice.playerPosition);
    console.log(`player position: ${playerPosition}`);

    return (
    <div
        style={{
            position:'relative',
            top:playerPosition[1],
            left:playerPosition[0],
            backgroundImage:`url('${ninjasprite}')`,
            backgroundPosition: '0 0',
            width: NINJA_SIZE.width,
            height: NINJA_SIZE.height
        }}
    />);
    
} 

export default handlePlayerMovement(Player);