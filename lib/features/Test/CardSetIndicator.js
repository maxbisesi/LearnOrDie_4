import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { unStudySet } from '../Cards/cardSlice';

export default function CardSetIndicator() {
    console.log('-- CardSetIndicator --');
    const cardSets = useSelector( state => state.cardSlice.cardSets );
    const studySetIds = useSelector( state => state.cardSlice.studySetIds );
    console.log(`studySetIds: ${studySetIds}`);

    const testSets = [];
    studySetIds.forEach( (studyid) => {
        const setInd = cardSets.find( set => set.set_id == studyid );
        console.log(`found: ${setInd}`);
        testSets.push(setInd);
    });

    const dispatch = useDispatch();

    const indicators = testSets.map( (s) => {
        console.log(`creating indicator for id: ${s.set_id} setname: ${s.setname}`);
        return (
            <div key={s.set_id} onClick={ () => dispatch(unStudySet(s.set_id)) } data-setid={s.set_id} className="studySet-indicator">
                {s.setname} - {s.size}
                <br/>
                {s.description}
            </div>
        );
    });

    if(indicators.length > 0) {
        return (
            <div className="studySet-incator-container">
                {indicators}
            </div>
        );
    } else {
        return null;
    }

}