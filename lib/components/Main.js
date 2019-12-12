import React from 'react';
import Chum from './Chum';
import Home from './Home';
import Test from './Test';
import Galley from './Galley';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import PropTypes from 'prop-types';
import axios from 'axios';

class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Chum</Tab>
          <Tab>Test</Tab>
          <Tab>Galley</Tab>
        </TabList>
          <TabPanel>
            <Home/>
          </TabPanel>
          <TabPanel>
            <Chum/>
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

}

export default Main;
