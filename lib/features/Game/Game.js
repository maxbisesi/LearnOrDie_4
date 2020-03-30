import React,{ useState } from "react";
import Spritesheet from 'react-responsive-spritesheet';
import GreatWhite from './GreatWhite';
import Hammerhead from './Hammerhead';
import World from './World';
import Player from './Player';

export default function Game(props) {
    return (
     <div>
        <World />
     </div>
    );
}