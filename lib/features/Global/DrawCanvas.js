import React, { useRef } from "react";

export default function TriangleModule() {
    /* const canvasRef = useRef(null);
    function draw() {
        const canvasObject = canvasRef.current;
        const ctx = canvasObject.getContext('2d');
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();
    }
    return (
        <main onClick={draw}>
            <canvas ref={canvasRef} />
        </main>
    ); */

    return (
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 10 H 50 V 90 H 10 L 10 10"/>
            <path d="M 130 110 C 120 140, 180 140, 170 110" stroke="black" fill="black"/>
        </svg>
    );

}