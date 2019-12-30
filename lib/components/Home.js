import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './HomeScreenCustomSheet.css';
import Login from './Login';
import Register from './Register';
import PropTypes from 'prop-types';
import store from './store';
import Home_UserInfo from './Presentational/Home_UserInfo';
import Home_Categories from './Presentational/Home_Categories';
import Home_History from './Presentational/Home_History';
import BucketBrigade from './Graphics/BucketBrigade';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.buttons = {
      profile: {value:"Profile"},
      logout: {value: "Logout"},
      comeAboard: {value: "Come Aboard"},
      galley: {value: "Go to the Galley"}
    }

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    console.log(e.target.value);
    if(e.target.value === 'Go to the Galley') {
      this.props.loggedIn ? this.props.newTab('galley') : alert('You have to be part of the crew to use the Galley')
    }
  }

  render() {
    console.log('-- Home --');  
    const homeButtons = [];

    Object.keys(this.buttons).forEach(name => {

      const {value, onClick} = this.buttons[name];

      homeButtons.push(
      <input
        key={value}
        className="homePageButton"
        type="button"
        value={value}
        onClick={this.handleClick}
      />
      );
    });
    return (
      <>
        {homeButtons}
        <Home_UserInfo />
        <br />
        <Home_Categories />
        <br />
        <br />
        <Home_History />
        <br />
        {/* rank up logout popup */}
        <div id="upgradepopup" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <span className="close">&times;</span>
              <h2 id="newbadgemessage"></h2>
            </div>
            <div className="popup-body">
              <img id="popupnewbadge" height="400px" width="230px" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps,null)(Home);
