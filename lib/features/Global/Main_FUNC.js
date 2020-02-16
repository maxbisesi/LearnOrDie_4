import React,{ useState } from "react";
import Chum from "../Cards/Chum";
import ChumFN from "../Cards/Chum_FUNC";
import Home from "../User/Home/Home";
import Test from "../Test/Test";
import Galley from "../Cards/Galley";
import Login from "../User/Login";
import { saveSession } from "../User/userSlice";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
//import PropTypes from 'prop-types';
import './MainStyle.css';

export default function Main_FUNC(prop) {
    const tabData = {
        home: {text: 'Home', color:"SkyBlue", component: <Home newTab={newTab}/>},
        galley: {text: 'Galley', color:"SkyBlue", component: <Galley />},
        test: {text: 'Test', color:"SkyBlue", component: <Test />},
        chum: {text: 'Chum', color:"SkyBlue", component: <ChumFN />},
        login: {text: 'Login', color:"SkyBlue", component: <Login/>}
    }; 

    const [activeTabs, setActiveTabs] = useState(
        {home: true,
        galley: false,
        test: true,
        chum: true,
        login: true }
    );

    // New Tab function
    function newTab(tab) {
        console.log(`--- Home --- tab name : ${tab}`);
        //this.setState((state,props) => { return { [tab]:true }; } );
        setActiveTabs({...activeTabs,[tab]:true});
    }
    
    const [tabIndex, setTabIndex] = useState(0);

    console.log(`--- Main --- `);
    const tabs = [];
    const tabPanels = [];

    Object.keys(tabData).forEach((part, i, theArray) => {
        const tabName = theArray[i];
        if (!activeTabs[tabName]) { return; }
        const { text, color, component } = tabData[tabName];

        tabs.push(
            <Tab style={{ backgroundColor: color }} key={tabName}>
            {text}
            </Tab>
        );

        tabPanels.push(
        <TabPanel key={tabName}>
            {component}
        </TabPanel>
        );
    });

    return (
        <Tabs selectedIndex={tabIndex} onSelect={(ind, lastIndex, event) => { setTabIndex(ind); }}>
        <TabList>
            {tabs}
        </TabList>
            {tabPanels}
        </Tabs>
    );
};
