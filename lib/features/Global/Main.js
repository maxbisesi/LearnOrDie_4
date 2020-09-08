import React,{ useState } from "react";
import Chum from "../Cards/Chum";
import Home from "../User/Home/Home";
import Test from "../Test/Test";
import Galley from "../Cards/Galley";
import Login from "../User/Login";
import DrawCanvas from "./DrawCanvas";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import "react-tabs/style/react-tabs.css";
import { useBeforeunload } from 'react-beforeunload';
import './MainStyle.css';

export default function Main(props) {
    const dispatch = useDispatch();
    const user = useSelector( state => state.userSlice.user);
    const user_id = user.user_id;
    const loggedIn = useSelector( state => state.userSlice.loggedIn);
    const drawtab = useSelector( state => state.userSlice.tabs.drawtab, shallowEqual );

    const [tabIndex, setTabIndex] = useState(0);
    console.log(`--- Main --- `);

    // Save state before leaving page:
    useBeforeunload( async () => {
        console.log('unloading');
    });

    const galleyTab = (<Tab id="react-tabs-8" style={{ backgroundColor: "SkyBlue" }}>Galley</Tab>);
    const galleyPan = (<TabPanel key="galley"><Galley setTab={setTabIndex}/></TabPanel>) ;
    const drawcanvasTab = (<Tab style={{ backgroundColor: "SkyBlue" }}>Draw</Tab>);
    const drawcanvasPanel = (<TabPanel key="drawcanvas"><DrawCanvas /></TabPanel>);

    return (
        <Tabs selectedIndex={tabIndex} onSelect={(ind, lastIndex, event) => { setTabIndex(ind); }}>
        <TabList>
            <Tab id="react-tabs-0" style={{ backgroundColor: "SkyBlue" }}>
                {loggedIn ? 'Profile' : 'Login'}
            </Tab>
            <Tab id="react-tabs-2" style={{ backgroundColor: "SkyBlue" }}>
                Home
            </Tab>
            <Tab id="react-tabs-4" style={{ backgroundColor: "SkyBlue" }}>
                Test
            </Tab>
            <Tab id="react-tabs-6" style={{ backgroundColor: "SkyBlue" }}>
                Chum
            </Tab>
            {loggedIn ? galleyTab : null}
            {loggedIn&&drawtab.active ? drawcanvasTab : null }
        </TabList>
            <TabPanel key="login">
                <Login />
            </TabPanel>
            <TabPanel key="home">
                <Home purgeState={props.purge} setTab={setTabIndex}/>
            </TabPanel>
            <TabPanel key="test">
                <Test setTab={setTabIndex} />
            </TabPanel>
            <TabPanel key="chum">
                <Chum setTab={setTabIndex} />
            </TabPanel>
            {loggedIn ? galleyPan : null}
            {loggedIn&&drawtab.active ? drawcanvasPanel : null }
        </Tabs>
    );
}
