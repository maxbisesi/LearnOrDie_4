import React,{ useState, useSelector } from "react";
import { connect } from "react-redux";
import './PointsStyle.css';

export function Points(props) {
    console.log(`--- Points ---`);
    const streakClass = useSelector(state => state.session.streakClass);
    const points = useSelector(state => state.session.points);
    return (
      <div className="pointsContainer">
        <p className={'pointsNormal ' + streakClass} id="points">{points}</p>
      </div>
    );
}


