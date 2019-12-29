import React from "react";
import Chum from "./Chum";
import Home from "./Home";
import Test from "./Test";
import Galley from "./Galley";
import Profile from "./Profile";
import Login from "./Login";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
//import PropTypes from 'prop-types';
import axios from "axios";

class Main extends React.Component {
  constructor() {
    super();
    this.state = { tabIndex: 0, loggedIn: false };
    this.handleSelect = this.handleSelect.bind(this);
    this.login = this.login.bind(this);
  }
  
  handleSelect = (index, lastIndex, event) => {
    this.setState({ tabIndex: index });
  };

  login() {
    console.log('login()');
    this.setState((state,props) => { return {loggedIn: true}; });
  }

  render() {
    return (
      <Tabs selectedIndex={this.state.tabIndex} onSelect={this.handleSelect}>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Chum</Tab>
          <Tab>Test</Tab>
          <Tab>Galley</Tab>
          <Tab>{this.state.loggedIn ? 'Profile' : 'Login'}</Tab>
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
        <TabPanel>
          <Login loggedIn={this.state.loggedIn} login={this.login} />
        </TabPanel>
      </Tabs>
    );
  }
}

export default Main;
