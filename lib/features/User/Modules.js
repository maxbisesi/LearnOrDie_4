import React, {useState} from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { toggleMathModule, toggleChatModule, toggleDrawTab } from './userSlice';
import './ProfileStyle.css';

export default function Modules() {
    console.log('-- Modules --');
    const modules = useSelector( state => state.userSlice.modules, shallowEqual);
    const tabs = useSelector( state => state.userSlice.tabs);
    const [sortOrder, setSortOrder] = useState('random');

    const dispatch = useDispatch();

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
            <div className="modules-module" key={modules[mod].id}>
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
            <div className="modules-module" key={tabs[tab].id}>
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
    /**            <span className="profile-modules-label">Tabs</span>
            <div className="profile-modules-container">
                {availableTabs}
            </div> */

    return (
        <div className="profile-settings-container">
            <span className="profile-modules-label">Modules</span>
            <div className="profile-modules-container">
                {availableModules}
            </div>
            <div className="profile-tabs-container">
                {availableTabs}
            </div>
            <div className="profile-sortorder-container">
                <div className="modules-module">
                    <label htmlFor="randomorder">Random</label>
                    <input
                        id="randomorder"
                        name="sortorder"
                        type="radio"
                        checked
                        onChange={() => { setSortOrder('random'); }}
                    />
                    <label htmlFor="randomorder">Sequential</label>
                    <input
                        id="sequentialorder"
                        name="sortorder"
                        type="radio"
                        onChange={() => { setSortOrder('sequential'); }}
                    />
                </div>
            </div>
        </div>
    ) ;
}

