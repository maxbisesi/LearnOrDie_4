import React,{ useState } from "react";
import Hammerhead from './Hammerhead';
import UnderWaterWorld from './Worlds/UnderWater/UnderWaterWorld';
import Player from './Player';
import './GameStyles.css';

export default function Game(props) {
    return (
     <div className="gameTab">
        <UnderWaterWorld />
     </div>
    );
}