import React,{ useRef } from "react";
import gsap from 'gsap';
import './GraphicsStyle.css';
import { shallowEqual, useSelector } from "react-redux";

export default function Bingo() {
  const bingoRef = useRef(null); 
  const nailed = useSelector(state => state.testSlice.session.nailed, shallowEqual);

  if(nailed !== 0 && bingoRef !== null) {
   const timeline = gsap.timeline();
   timeline.set(bingoRef.current,{opacity:1});
   timeline.to(bingoRef.current,{duration:3, scale:4, opacity:0});
   timeline.timeScale(2);
   timeline.play();
   timeline.set(bingoRef.current,{opacity:0,scale:1});
  }

  return (
      <div>
        <svg className="bingo" ref={bingoRef} version="2.2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="200" height="200">
            <circle cx="50" cy="50" r="10" stroke="black" strokeOpacity=".6" fill="black" fillOpacity="0" />
        </svg>
      </div>
  );
}