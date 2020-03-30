import React,{ useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import greatwhite from './SharkSprites/GreatwhiteHOR.png';
import { GREATWHITE_SIZE } from '../../config';
import { connect } from 'react-redux';
import Spritesheet from 'react-responsive-spritesheet';

function GreaWhite(props) { 
    return (
       <div
            style={{
                position:'absolute'
                top:props.sharkPosition[1],
                left:props.sharkPosition[0],
                backgroundImage:`url('${greatwhite}')`,
                backgroundPosition: props.sharkSpriteLocation,
                width: GREATWHITE_SIZE.width,
                height: GREATWHITE_SIZE.height
            }}
        />
    );
} 

function mapStateToProps(state) {
    return {
        sharkPosition: state.gameSlice.sharkPosition,
        sharkSpritePosition: state.gameSlice.sharkSpriteLocation
    }
}

export default connect(mapStateToProps)(GreatWhite);