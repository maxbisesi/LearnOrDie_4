import React,{ useRef } from "react";
import gsap from 'gsap';
import './GraphicsStyle.css';

export default function Star(props) {
  const starRef = useRef(null); 
  
  function starburst() {
    const startl = gsap.timeline();
    startl.set(starRef.current, { scale:.1 });
    .to(starRef.current, { duration:1, scale:4, opacity: 0 });
    startl.play();

    startl.set(starRef.current, { opacity: .5 });
  }

  return (
      <svg onClick={starburst} ref={starRef} version="2.2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="200" height="200">
        <defs>
            <path d="M342.72 199.27L449.29 183.51L394.56 272.34L439.58 362.41L334.86 344L256.12 415.44L246.14 315.24L152.45 269.32L251 225.79L271.83 125.98L342.72 199.27Z" id="a1BwU6QeLI">
            </path>
            <radialGradient id="gradientddcvaRHA" gradientUnits="userSpaceOnUse" cx="315.67" cy="261.77" dx="368.16" dy="453.08" r="198.38">
              <stop style={{'stopColor': '#f8e209','stopOpacity': 1}} offset="0%">
              </stop>
              <stop style={{'stopColor': '#ffffff','stopOpacity': 1}} offset="100%">
              </stop>
            </radialGradient>
        </defs>
        <g>
          <g>
            <g>
              <use href="#a1BwU6QeLI" opacity="0" fill="url(#gradientddcvaRHA)">
              </use>
            </g>
          </g>
        </g>
      </svg>
  );
}