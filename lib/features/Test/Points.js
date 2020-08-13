import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import './PointsStyle.css';

export default function Points(props) {
    console.log(`--- Points ---`);
    const streakClass = useSelector(state => state.testSlice.session.streakClass, shallowEqual);
    const points = useSelector(state => state.testSlice.session.points, shallowEqual);

    return (
        <div className="pointsContainer" >
          <p className={'pointsNormal ' + streakClass} id="points">{points}</p>
        </div>
    );
}


