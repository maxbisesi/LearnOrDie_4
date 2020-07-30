import React, { useRef } from "react";

export default function TriangleModule() {
    const canvasRef = useRef(null);

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
    );

}