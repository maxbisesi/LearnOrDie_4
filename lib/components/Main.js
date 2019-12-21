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
    this.state = { tabIndex: 0 };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (index, lastIndex, event) => {
    console.log(`index ${index}`);
    console.log(`lastIndex: ${lastIndex}`);
    this.setState({ tabIndex:index});
  };

  render() {
    return (
      <Tabs selectedIndex={this.state.tabIndex} onSelect={this.handleSelect}>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Chum</Tab>
          <Tab>Test</Tab>
          <Tab>Galley</Tab>
        </TabList>
          <TabPanel>
            <Home />
          </TabPanel>
          <TabPanel >
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
