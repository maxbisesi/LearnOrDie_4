import React from 'react';
import Chum from './Chum';
import Home from './Home';
import Test from './Test';
import Galley from './Galley';
import Login from './Login';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

class Main extends React.Component {
  constructor() {
    super();
    this.changeUser = this.changeUser.bind(this);
    this.state = {
      user: {
        username: 'DEFAULT',
        name: 'MAX BISESI 05',
        changeUser: this.changeUser
      }
    };
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
        <UserContext.Provider value={this.state.user}>
          <TabPanel>
            <Home changeUser={this.changeUser} />
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
        </UserContext.Provider>
      </Tabs>
    );
  }

  changeUser(user) {
    console.log(' change user in Main');
    console.log(user);
    console.log(user.data.name);
    this.setState({ name: user.data.name });
  }
}

Main.contextType = UserContext;
export default Main;
