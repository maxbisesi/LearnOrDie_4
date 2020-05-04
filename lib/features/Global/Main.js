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
    const [tabIndex, setTabIndex] = useState(0);
    console.log(`--- Main --- `);

    // Save state before leaving page:
    useBeforeunload( async (event) => { 
        if(user_id === 'GUESTID' || loggedIn === false) { 
            console.log('GOOD BYE GUEST USER!')
        }
        else { await axios.post('/saveSession',{'session':session}); }
    });

    const galleyTab = (<Tab style={{ backgroundColor: "SkyBlue" }}>Galley</Tab>);
    const galleyPan = (<TabPanel key="galley"><Galley /></TabPanel>) 

    return (
        <Tabs selectedIndex={tabIndex} onSelect={(ind, lastIndex, event) => { setTabIndex(ind); }}>
        <TabList>
            <Tab style={{ backgroundColor: "SkyBlue" }}>
                Home
            </Tab>
            <Tab style={{ backgroundColor: "SkyBlue" }}>
                Test
            </Tab>
            <Tab style={{ backgroundColor: "SkyBlue" }}>
                Chum
            </Tab>
            <Tab style={{ backgroundColor: "SkyBlue" }}>
                Login
            </Tab>
            {loggedIn ? galleyTab : null}
        </TabList>
            <TabPanel key="home">
                <Home/>
            </TabPanel>
            <TabPanel key="test">
                <Test />
            </TabPanel>
            <TabPanel key="chum">
                <Chum/>
            </TabPanel>
            <TabPanel key="login">
                <Login/>
            </TabPanel>
            {loggedIn ? galleyPan : null}
        </Tabs>
    );
}
