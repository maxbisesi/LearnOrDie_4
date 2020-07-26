import React, { useState } from 'react';
import RankModal from './RankModal';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { rankup, toggleMathModule, toggleChatModule } from './userSlice';
import { checkRankUp } from '../../Utils';
import Home_UserInfo from './Home/Home_UserInfo';

export default function Profile() {
    const [showRankPopup, setShowRankPopup] = useState(false);
    const {points, userrank } = useSelector( state => state.userSlice.user, shallowEqual);
    const modules = useSelector( state => state.userSlice.modules, shallowEqual);

    const dispatch = useDispatch();
    // Check for Rank upgrade
    let nextRank =  checkRankUp(userrank,points,0);
    console.log(`${userrank} -- ${nextRank}`);
    if(nextRank !== userrank) { 
      //upgrade
      dispatch(rankup({'userrank':nextRank}));
      setShowRankPopup(true);
    }

    function toggleModule(e) {
        const modname = e.target.name;
        console.log(modname);
        switch(modname) {
            case `Math Module`: dispatch(toggleMathModule()); break;
            case `Chat Module`: dispatch(toggleChatModule()); break;
            default: throw new Error('Unknown Module Type for Profile.');
        }
    }

    // Settings to show, Customizations available
    const availableModules = [];

    Object.keys(modules).forEach( (mod) => {
            availableModules.push(
                <div>
                    <label htmlFor={modules[mod].id}>{modules[mod].name}</label>
                    <input
                        id={modules[mod].id}
                        name={modules[mod].name}
                        type="checkbox"
                        value={modules[mod].active}
                        checked={modules[mod].active}
                        onChange={toggleModule}
                    />
                </div>
            );
    });

    return (
        <div>
            <Home_UserInfo />
            { showRankPopup ? <RankModal rank={nextRank} setShowPopup={setShowRankPopup} /> : null }
            <div>
                <span className="profile-modules-label">Modules</span>
                <div className="profile-modules-container">
                    {availableModules}
                </div>
            </div>
        </div>
    ) ;
}

