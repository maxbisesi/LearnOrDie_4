import React, { useState, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

export default function CardSetIndicator() {
    const cardSets = useSelector( state => state.cardSlice.cardSets );
    const studySetNames = useSelector( state => state.cardSlice.studySetNames );
    const testSets = cardSets.filter( set => studySetNames.includes(set.setname));

    function indicatorClicked(setid) {
        console.log(setid);
    }

    const indicators = testSets.map( (s) => {
        return (
            <div key={s.set_id} onClick={() => indicatorClicked(s.set_id)} data-setid={s.set_id} className="studySet-indicator">
                {s.setname} - {s.size}
                <br/>
                {s.description}
            </div>
        );
    });

    return (
        <div className="studySet-incator-container">
            {indicators}
        </div>
    );
}