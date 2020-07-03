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
    const {points, streak, rut, streakClass, nailed, whiffed, started} = useSelector(state => state.testSlice.session, shallowEqual);
    const cardsAdded = useSelector(state => state.cardSlice.cardsAdded);
    const user = useSelector( state => state.userSlice.user);
    const user_id = user.user_id;
    const loggedIn = useSelector( state => state.userSlice.loggedIn);

    const [tabIndex, setTabIndex] = useState(0);
    console.log(`--- Main --- `);

    // Save state before leaving page:
    useBeforeunload( async (event) => {
        if(user_id === 'GUESTID' || loggedIn === false) { 
            console.log('GOOD BYE GUEST USER!');
        } else { 
            const userSesh =  { 'correct': nailed,'incorrect': whiffed,'cards_added': cardsAdded,'points_added': points,'card_sets_added': 0,'user_id': user_id };
            // await axios.post('/saveSession',{'session':userSesh,'user':user}); 
        }
    });

    const galleyTab = (<Tab style={{ backgroundColor: "SkyBlue" }}>Galley</Tab>);
    const galleyPan = (<TabPanel key="galley"><Galley setTab={setTabIndex}/></TabPanel>) ;

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
                <Home setTab={setTabIndex}/>
            </TabPanel>
            <TabPanel key="test">
                <Test setTab={setTabIndex} />
            </TabPanel>
            <TabPanel key="chum">
                <Chum setTab={setTabIndex} />
            </TabPanel>
            <TabPanel key="login">
                <Login />
            </TabPanel>
            {loggedIn ? galleyPan : null}
        </Tabs>
    );
}
