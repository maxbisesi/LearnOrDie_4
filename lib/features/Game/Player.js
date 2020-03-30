import React,{ useState } from "react";
import { handlePlayerMovement } from './PlayerMovement';
import { connect } from 'react-redux';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import ninjasprite from './PlayerSprites/NinjaFull.png';
import { NINJA_SIZE } from '../../config'

function Player(props) { 
    //const playerPosition = useSelector(state => state.gameSlice.playerPosition);

    return (
    <div
        style={{
            position:'absolute',
            top:props.playerPosition[1],
            left:props.playerPosition[0],
            backgroundImage:`url('${ninjasprite}')`,
            backgroundPosition: props.spriteLocation,
            width: NINJA_SIZE.width,
            height: NINJA_SIZE.height
        }}
    />);
    
} 


function mapStateToProps(state) {
    return {
        playerPosition: state.gameSlice.playerPosition,
        spriteLocation: state.gameSlice.spriteLocation
    }
}

export default connect(mapStateToProps)(handlePlayerMovement(Player));