import React from "react";
import Chum from "./Chum";
import Home from "./Home";
import Test from "./Test";
import Galley from "./Galley";
import Login from "./Login";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
//import PropTypes from 'prop-types';
import './Styles/Main.css';

class Main extends React.Component {
  constructor() {
    super();

    this.tabs = {
      home: {text: 'Home', color:"SkyBlue", component: <Home newTab={this.newTab}/>},
      galley: {text: 'Galley', color:"SkyBlue", component: <Galley />},
      test: {text: 'Test', color:"SkyBlue", component: <Test />},
      chum: {text: 'Chum', color:"SkyBlue", component: <Chum />},
      login: {text: 'Login', color:"SkyBlue", component: <Login/>}
    }; 

    this.state = { 
      tabIndex: 0, 
      home: true,
      // Set to trure temporarily for development
      galley: true,
      test: true,
      chum: true,
      login: true 
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.newTab = this.newTab.bind(this);
  }
  
  handleSelect = (index, lastIndex, event) => {
    this.setState({ tabIndex: index });
  };

  newTab(tab) {
    console.log(`--- Home --- tab name : ${tab}`);
    this.setState((state,props) => { return { [tab]:true }; } );
  }

  render() {
    const tabs = [];
    const tabPanels = [];

    Object.keys(this.tabs).forEach(tabName => {
      if (!this.state[tabName]) { return; }
      const { text, color, component } = this.tabs[tabName];

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
      <Tabs selectedIndex={this.state.tabIndex} onSelect={this.handleSelect}>
        <TabList>
          {tabs}
        </TabList>
        {tabPanels}
      </Tabs>
    );
  }
}

export default Main;
