import React, { useState } from 'react';
import RankModal from './RankModal';
import { checkRankUp } from '../../Utils';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

export default function Profile(props) {
    const [showRankPopup, setShowRankPopup] = useState(true);
    const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank } = useSelector( state => state.userSlice.user, shallowEqual);
    const badges = 0;
    const shouldRankup = checkRankUp(rank, totalPoints, badges);
     if(rank !== shouldRankup) {
        // Time to upgrade  
        dispatch(rankup(newRank));
        // Show them the rank up pop up
        setShowRankPopUp(true);
      }

    return (
        <div>
            Profiles
            { showRankPopup ? <RankModal setShowPopup={setShowRankPopup} /> : null }
        </div>
    ) ;
}

