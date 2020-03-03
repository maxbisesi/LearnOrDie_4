import React, { useState } from 'react';
import RankModal from './RankModal';
import { checkRankUp } from '../../Utils';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { rankup } from './userSlice';

export default function Profile(props) {
    const [showRankPopup, setShowRankPopup] = useState(false);
    const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank, firstTimeUser } = useSelector( state => state.userSlice.user, shallowEqual);

    const badges = 0;
    const shouldRankup = checkRankUp(rank, totalPoints, badges);
    const dispatch = useDispatch();

     if(rank !== shouldRankup) {
        // Time to upgrade  
        dispatch(rankup(shouldRankup));
        // Show them the rank up pop up
        setShowRankPopup(true);
      }

      if(firstTimeUser == true) { setShowRankPopup(true); }

    return (
        <div>
            Profiles
            { showRankPopup ? <RankModal setShowPopup={setShowRankPopup} /> : null }
        </div>
    ) ;
}

