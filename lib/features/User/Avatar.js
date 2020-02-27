import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './AvatarStyle.css';
import Fcs1 from './ensignia/Fcs1';

export default function Avatar(props) {
    return (
        <div className="avatar-grid-container">
            <div className="avatar-grid-item"><Fcs1 /></div>
            <div className="avatar-grid-item"><Fcs1 /></div>
            <div className="avatar-grid-item"><Fcs1 /></div>  
            <div className="avatar-grid-item"><Fcs1 /></div>
            <div className="avatar-grid-item"><Fcs1 /></div>
            <div className="avatar-grid-item"><Fcs1 /></div>  
            <div className="avatar-grid-item"><Fcs1 /></div>
            <div className="avatar-grid-item"><Fcs1 /></div>
            <div className="avatar-grid-item"><Fcs1 /></div>  
        </div>);
}