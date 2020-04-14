import React,{ useState } from "react";
import Chum from "../Cards/Chum";
import Home from "../User/Home/Home";
import Test from "../Test/Test";
import Galley from "../Cards/Galley";
import Login from "../User/Login";
import Game from '../Game/Game';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import "react-tabs/style/react-tabs.css";
import { useBeforeunload } from 'react-beforeunload';
import axios from 'axios';
import './MainStyle.css';

export default function Main(props) {

    //Global State
    // Session
    const session = useSelector( state => state.userSlice.session, shallowEqual );
    // Use Slice
    const user_id = useSelector( state => state.userSlice.user.user_id);
    const loggedIn = useSelector( state => state.userSlice.loggedIn);

    const tabData = {
        home: {text: 'Home', color:"SkyBlue", component: <Home newTab={newTab}/>},
        galley: {text: 'Galley', color:"SkyBlue", component: <Galley />},
        test: {text: 'Test', color:"SkyBlue", component: <Test />},
        chum: {text: 'Chum', color:"SkyBlue", component: <Chum/>},
        login: {text: 'Login', color:"SkyBlue", component: <Login/>}
    }; 

    // game: {text:'Game', color:'Green', component: <Game />}

    const [activeTabs, setActiveTabs] = useState(
        {home: true,
        galley: false,
        test: true,
        chum: true,
        login: true, game:true }
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
        const tabName = part;
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

    // Save state before leaving page:
    useBeforeunload( async (event) => { 
        if(user_id === 'GUESTID' || loggedIn === false) { 
            console.log('GOOD BYE GUEST USER!')
        }
        else { await axios.post('/saveSession',{'session':session}); }
    });

    return (
        <Tabs selectedIndex={tabIndex} onSelect={(ind, lastIndex, event) => { setTabIndex(ind); }}>
        <TabList>
            {tabs}
        </TabList>
            {tabPanels}
        </Tabs>
    );
}
