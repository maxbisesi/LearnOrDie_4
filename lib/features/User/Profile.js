import React, { useState } from 'react';
import RankModal from './RankModal';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { rankup, toggleMathModule, toggleChatModule, toggleDrawTab } from './userSlice';
import Utils from '../../Utils';
import Home_UserInfo from './UserInfo';
import './ProfileStyle.css';

export default function Profile() {
    console.log('-- Profile --');
    const [showRankPopup, setShowRankPopup] = useState(false);
    const {points, userrank } = useSelector( state => state.userSlice.user, shallowEqual);
    const modules = useSelector( state => state.userSlice.modules, shallowEqual);
    const tabs = useSelector( state => state.userSlice.tabs);

    const dispatch = useDispatch();
    // Check for Rank upgrade
    let nextRank =  Utils.checkRankUp(userrank,points,0);
    console.log(`${userrank} -- ${nextRank}`);
    if(nextRank !== userrank) { 
      //upgrade
      dispatch(rankup({'userrank':nextRank}));
      setShowRankPopup(true);
    }

    function toggleFeature(e) {
        const modname = e.target.name;
        console.log(modname);
        switch(modname) {
            case `Math Module`: dispatch(toggleMathModule()); break;
            case `Chat Module`: dispatch(toggleChatModule()); break;
            case `Draw Tab`: dispatch(toggleDrawTab()); break;
            default: throw new Error('Unknown Module Type for Profile.');
        }
    }

    // Settings to show, Customizations available
    const availableModules = [];

    Object.keys(modules).forEach( (mod) => {
        availableModules.push(
            <div key={modules[mod].id}>
                <label htmlFor={modules[mod].id}>{modules[mod].name}</label>
                <input
                    id={modules[mod].id}
                    name={modules[mod].name}
                    type="checkbox"
                    value={modules[mod].active}
                    checked={modules[mod].active}
                    onChange={toggleFeature}
                />
            </div>
        );
    });

    const availableTabs = [];

    Object.keys(tabs).forEach( (tab) => {
        availableTabs.push(
            <div key={tabs[tab].id}>
                <label htmlFor={tabs[tab].id}>{tabs[tab].name}</label>
                <input
                    id={tabs[tab].id}
                    name={tabs[tab].name}
                    type="checkbox"
                    value={tabs[tab].active}
                    checked={tabs[tab].active}
                    onChange={toggleFeature}
                />
            </div>
        );
    });

    return (
        <div>
            <Home_UserInfo />
            { showRankPopup ? <RankModal rank={nextRank} setShowPopup={setShowRankPopup} /> : null }
        </div>
    ) ;
}

