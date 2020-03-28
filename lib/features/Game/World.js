import React,{ useState } from "react";
import Hammerhead from './Hammerhead';
import GreatWhite from './GreatWhite';
import Player from './Player';
import { WORLD_SIZE, tiles, OBJECT_SIZE }from '../../config'
import Map from './Map';

export default function World(props) {
    console.log(`tiles length: ${tiles.length}`);
    return (
        <div style={{
            position:'relative',
            width: WORLD_SIZE.width,
            height: WORLD_SIZE.height
        }}>
            <Map />
            <Player />
        </div> 
    );
}