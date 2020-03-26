import React,{ useState } from "react";
import Hammerhead from './Hammerhead';
import GreatWhite from './GreatWhite';
import Player from './Player';
import { WORLD_SIZE }from '../../config'

export default function World(props) {
    return (
        <div style={{
            position:'relative',
            backgroundColor: 'blue',
            border: '3px solid black',
            width: WORLD_SIZE.width,
            height: WORLD_SIZE.height
        }}>
            <Player />
        </div> 
    );
}