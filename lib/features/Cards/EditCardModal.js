import React, { useState, } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import {  } from './cardSlice';

export default function Galley(props) {
    console.log('--- EditCardModal ---');
    
    return (
        <div className="editcard-modal">
            <div className="editcard-modalContent"> 
                <textarea className="editcardmodal-card" />
                <textarea className="editcardmodal-answer" />
                <input type="button" value="Cancel" onClick={() => props.setEditCardModal(false)} />
            </div>
        </div>
    );

}