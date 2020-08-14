import React,{ useRef } from "react";
import gsap from 'gsap';
import './GraphicsStyle.css';

export default function Star() {
  const starRef = useRef(null); 
  
  function starburst() {
    const startl = gsap.timeline();
    startl.to(starRef.current, {duration:3,scale:4,opacity:.7})
    .to(starRef.current, {duration:1,opacity:0,scale:1});
    startl.play();
    startl.set(starRef.current, {opacity: 0, scale:.5});
  }

  return (
      <div onClick={starburst}>
        <svg ref={starRef} version="2.2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="200" height="200">
          <defs>
              <path d="M342.72 199.27L449.29 183.51L394.56 272.34L439.58 362.41L334.86 344L256.12 415.44L246.14 315.24L152.45 269.32L251 225.79L271.83 125.98L342.72 199.27Z" id="a1BwU6QeLI"/>
              <radialGradient id="gradientddcvaRHA" gradientUnits="userSpaceOnUse" cx="315.67" cy="261.77" dx="368.16" dy="453.08" r="198.38">
                <stop style={{'stopColor': '#f8e209','stopOpacity': 1}} offset="0%"/>
                <stop style={{'stopColor': '#ffffff','stopOpacity': 1}} offset="100%"/>
              </radialGradient>
          </defs>
          <g className="star">
            <use href="#a1BwU6QeLI" opacity="1" fill="url(#gradientddcvaRHA)"/>
          </g>
        </svg>
      </div>
  );
}