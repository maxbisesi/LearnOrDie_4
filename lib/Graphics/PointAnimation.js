import React,{ useRef } from "react";
import gsap from 'gsap';
import './GraphicsStyle.css';
import { shallowEqual, useSelector } from "react-redux";

export default function PointAnimation() {
  const starRef = useRef(null); 
  const bingoRef = useRef(null); 
  const nailed = useSelector(state => state.testSlice.session.nailed, shallowEqual);
  const streak = useSelector(state => state.testSlice.session.streakClass, shallowEqual);

  function starburst() {
   const ranx = gsap.utils.random(-30,30);
   const rany = gsap.utils.random(-30,30);
   const ranrotate = gsap.utils.random(0,250);
   const startl = gsap.timeline();
    startl.set(starRef.current,{opacity:.9,scale:.3,x:ranx,y:rany});
    startl.to(starRef.current, {duration:3,scale:3,opacity:0,rotation:ranrotate});
    startl.timeScale(3);
   startl.play();
   startl.set(starRef.current,{opacity:0,scale:1,x:0,y:0});
  }

  function bingo() {
    const timeline = gsap.timeline();
  
    const ranx = gsap.utils.random(-30,30);
    const rany = gsap.utils.random(-30,30);
  
    timeline.set(bingoRef.current,{opacity:1,x:ranx,y:rany});
    timeline.to(bingoRef.current,{duration:2, scale:6, opacity:0});
    timeline.timeScale(4);
    timeline.play();
  
    timeline.set(bingoRef.current,{opacity:0,scale:1});
  }

  if(nailed !== 0 && bingoRef !== null && starRef !== null) {
    switch(streak) {
      case `onStreak1`: bingo(); break;
      case `onStreak2`: starburst(); break;
      case `onStreak3`: starburst(); break;
      case `onStreak4`: starburst(); break;
      default: alert('Unknown streak'); break;
    }
  }
  /**
   *     <svg className="bingo" ref={bingoRef} version="2.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
            <circle cx="100" cy="100" r="20" stroke="black" strokeOpacity=".6" fill="black" fillOpacity="0" />
        </svg>
   */

  return (
      <div>
        <svg className="star" ref={starRef} version="2.2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="200" height="200">
          <defs>
              <path d="M342.72 199.27L449.29 183.51L394.56 272.34L439.58 362.41L334.86 344L256.12 415.44L246.14 315.24L152.45 269.32L251 225.79L271.83 125.98L342.72 199.27Z" id="a1BwU6QeLI"/>
              <radialGradient id="gradientddcvaRHA" gradientUnits="userSpaceOnUse" cx="315.67" cy="261.77" dx="368.16" dy="453.08" r="198.38">
                <stop style={{'stopColor': '#f8e209','stopOpacity': 1}} offset="0%"/>
                <stop style={{'stopColor': '#ffffff','stopOpacity': 1}} offset="100%"/>
              </radialGradient>
          </defs>
          <g>
            <use href="#a1BwU6QeLI" opacity="1" fill="url(#gradientddcvaRHA)"/>
          </g>
        </svg>
        <svg className="bingo" ref={bingoRef} version="2.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
            <circle cx="100" cy="100" r="20" stroke="black" strokeOpacity=".6" fill="black" fillOpacity="0" />
        </svg>
      </div>
  );
}