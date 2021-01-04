import React, { useReducer, useRef } from "react";
import './ChumStyle.css';
import urchin from '../Game/Objects/Urchin.png';

export default function Fins() {
  console.log('--- Fins ---');

  return (
    <div className="chum-fin-container">
        <div>You captured three fins!</div>
        <div style={{
            position:'absolute',
            top: 200,
            left: 300,
            backgroundRepeat:'no-repeat',
            backgroundImage:`url('${urchin}')`,
            backgroundPosition: '0px 0px',
            width:200,
            height:200,
        }}/>
    </div>
  );
  
}
