import React, { useState } from 'react';
import RankModal from './RankModal';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { rankup } from './userSlice';
import { checkRankUp } from '../../Utils';

export default function Profile(props) {
    const [showRankPopup, setShowRankPopup] = useState(true);
    const {user_id, username, email, points, userrank } = useSelector( state => state.userSlice.user, shallowEqual);

    const badges = 0;
    const dispatch = useDispatch();
    let nextRank =  checkRankUp(userrank,points,0);
    console.log(`${userrank} -- ${nextRank}`);
    if(nextRank !== userrank) { 
      //upgrade
      dispatch(rankup({'userrank':nextRank}));
      setShowRankPopup(true);
    }
    return (
        <div>
            Profiles
            { showRankPopup ? <RankModal rank={nextRank} setShowPopup={setShowRankPopup} /> : null }
        </div>
    ) ;
}

