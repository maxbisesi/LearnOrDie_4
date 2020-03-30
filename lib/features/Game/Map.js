import React,{ useState } from "react";
import { connect } from 'react-redux';
import Spritesheet from 'react-responsive-spritesheet';
import GreatWhite from './GreatWhite';
import Hammerhead from './Hammerhead';
import World from './World';
import Player from './Player';
import { MAP_SIZE, OBJECT_SIZE } from '../../config';
import './GameStyles.css';
import { size } from "lodash";

function getTileSprite(type) {
    switch(type) {
        case 0: return 'Water'
        case 5: return 'Fish';
        case 6: return 'SandBag';
        case 7: return 'Urchin';  
        case 8: return 'Jelly'; 
        default: return 'unknown';
    }
}

function MapTile(props) {
    const tileSprite = getTileSprite(props.type);
    console.log(`tile type: ${tileSprite}`)
    return (<div className={`tile ${tileSprite}`}
            style={{
                height: OBJECT_SIZE.height,
                width: OBJECT_SIZE.width
            }}></div>);
}

function MapRow(props) {
    return props.row.map( (tile,ind) => {
        // Each one of these tiles is an element of the row array.
        return <MapTile key={`col${ind}`} type={tile} /> 
    });
}

function Map(props) {
    return (
     <div style={{
        position: 'relative',
        fontSize:0,
        top:0,
        left:0,
        margin: '0px',
        border: '1px solid white',
        width: MAP_SIZE.width,
        height: MAP_SIZE.height
     }}>
        { 
            props.tiles.map( (row,ind) => {
                //Each one of these rows is an array
                console.log(`row${ind}`);
                console.log(`row length:${row.length}`);
                return <MapRow key={`row${ind}`} row={row}/> 
            })
        }
     </div>
    );
}

function mapStateToProps(state) {
    return {
        tiles: state.gameSlice.tiles
    }
}

export default connect(mapStateToProps)(Map);