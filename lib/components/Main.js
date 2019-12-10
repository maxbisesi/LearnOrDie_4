import React from 'react';
import Chum from './Chum';
import Home from './Home';
import Test from './Test';
import Galley from './Galley';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

class Main extends React.Component {
    
    constructor(){
        super();
        
        this.changeUser = this.changeUser.bind(this);
    }


    render(){
        return( 
        <Tabs>
            <TabList>
                <Tab>Home</Tab>
                <Tab>Chum</Tab>
                <Tab>Test</Tab>
                <Tab>Galley</Tab>
            </TabList>

            <TabPanel>
                <Home />
            </TabPanel>
            <TabPanel>
                <Chum />
            </TabPanel>
            <TabPanel>
                <Test />
            </TabPanel>
            <TabPanel>
                <Galley />
            </TabPanel>
        </Tabs> 
        );
    }

    changeUser() { console.log(' change user '); }
}


Main.contextType = UserContext;
export default Main;