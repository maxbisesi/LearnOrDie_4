import React,{ useState, useRef, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import urchin from './Objects/Urchin.png';
import { OBJECT_SIZE } from '../../config';
//import { TweenMax, TimelineLite } from "gsap/all";
import { gsap } from 'gsap';

function Urchin(props) { 
    
    const urchinRef = useRef(null);

    function moveUrchinAround() {
        const tl = gsap.timeline();
        tl.to(urchinRef.current,{x:"+=600", y:"+=100", duration:4, rotate:180})
        .to(urchinRef.current,{y:"+=200", x:"-=300", duration:5, rotate:360})
        .to(urchinRef.current,{x:"-=100", duration:6, rotate:180})
        .to(urchinRef.current,{y:"-=100", duration:4, rotate:180});
    }

    useEffect( () =>{
        moveUrchinAround();
    });

    const urchin = (<div 
                        ref={urchinRef}
                        style={{
                        position:'absolute',
                        top:props.urchinPosition[1],
                        left:props.urchinPosition[0],
                        backgroundImage:`url('${urchin}')`,
                        backgroundPosition: '0px 0px',
                        width: OBJECT_SIZE.width,
                        height: OBJECT_SIZE.height}}
                    />);
    const diamond1 = (<div  ></div>);

    return (
       <div 
            ref={urchinRef}
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