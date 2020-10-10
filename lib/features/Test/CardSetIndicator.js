import React, { useState, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

export default function CardSetIndicator() {
    const cardSets = useSelector( state => state.cardSlice.cardSets );
    const studySetNames = useSelector( state => state.cardSlice.studySetNames );

    const indicators = [];
    studySetNames.forEach( (name) => {
        indicators.push(
            // Card Set names need to be unique for this to work
            <div key={name} className="studySet-indicator">
                {name}
            </div>
        );
    });

    return (
        <div className="studySet-incator-container">
            {indicators}
        </div>
    );
}