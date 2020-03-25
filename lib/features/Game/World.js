import React,{ useState } from "react";
import Hammerhead from './Hammerhead';
import GreatWhite from './GreatWhite';
import Player from './Player';

export default function World(props) {
    return (
        <div style={{
            position:'relative',
            width: '1000px',
            height: '800px',
            backgroundColor: 'blue',
            border: '3px solid black'
        }}>
            <Player />
            <Hammerhead />
            <GreatWhite />

        </div> 
    );
}