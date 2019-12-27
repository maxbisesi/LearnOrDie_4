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
    this.login = this.login.bind(this);
  }

  login() {
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

  comeAboard() {
    ReactDOM.render(<Register />, document.getElementById('root'));
  }

  render() {
    console.log('-- Home --');
    return (
      <>
        <h1></h1>
        <input
          className="homePageButton"
          id="myprofile"
          type="button"
          value="Profile"
        />
        <input
          className="homePageButton"
          id="logout"
          name="logout"
          type="button"
          value="Logout"
        />
        <input
          className="homePageButton"
          id="refresh"
          type="button"
          name="name"
          value="Refresh"
        />
        <input
          className="homePageButton"
          type="button"
          value="Login"
          onClick={this.login}
        />
        <input
          className="homePageButton"
          type="button"
          value="Come Aboard"
          onClick={this.comeAboard}
        />
        <Home_UserInfo />
        <BucketBrigade />
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

export default Home;
