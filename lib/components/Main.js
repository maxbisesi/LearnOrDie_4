import React from "react";
import Chum from "./Chum";
import Home from "./Home";
import Test from "./Test";
import Galley from "./Galley";
import Login from "./Login";
import { saveSession } from "../actions";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
//import PropTypes from 'prop-types';
import './Styles/Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
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
      galley: false,
      test: true,
      chum: true,
      login: true 
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.newTab = this.newTab.bind(this);
  }

  onUnload = (event) => {
    // Save DB and also log them out.
    this.props.saveSession();
  } 

  componentDidMount() {
    console.log(`component did mount`); 
    window.addEventListener('beforeunload', this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }
  
  handleSelect = (index, lastIndex, event) => {
    this.setState({ tabIndex: index });
  };

  newTab(tab) {
    console.log(`--- Home --- tab name : ${tab}`);
    this.setState((state,props) => { return { [tab]:true }; } );
  }

  render() {
    console.log(`--- Main --- `);
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

const mapDispatchToProps = (dispatch) => {
  return ( {
    saveSession: () => dispatch(saveSession())
  } );
};

const mapStateToProps = (state) => {
  return {
    userid: state.user.user_id, 
    username: state.user.userName,
    totalPoints: state.user.totalPoints,
    cardCount: state.user.cardCount,
    currentRank: state.user.rank,
    guest: state.user.guest,
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Main);
