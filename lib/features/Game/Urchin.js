import React,{ useState, useRef, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import urchin from './Objects/Urchin.png';
import { OBJECT_SIZE } from '../../config';
//import { TweenMax, TimelineLite } from "gsap/all";
import { gsap } from 'gsap';

function Urchin(props) { 
    
    const urchinRef = useRef(null);
    useEffect( ()=>{gsap.to(urchinRef.current, 2, {x: 100,delay:1});});
    return (
       <div ref={urchinRef}
            style={{
                position:'absolute',
                top:props.urchinPosition[1],
                left:props.urchinPosition[0],
                backgroundImage:`url('${urchin}')`,
                backgroundPosition: '0px 0px',
                width: OBJECT_SIZE.width,
                height: OBJECT_SIZE.height
            }}
        />
    );
} 

function mapStateToProps(state) {
    return {
        urchinPosition: state.gameSlice.urchinPosition
    }
}

export default connect(mapStateToProps)(Urchin);