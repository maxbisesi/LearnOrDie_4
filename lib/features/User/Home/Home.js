import React from 'react';
import { connect } from 'react-redux';
import Home_UserInfo from './Home_UserInfo';
import Home_Categories from './Home_Categories';
import Home_History from './Home_History';
import { saveSession } from '../userSlice';
import './HomeStyle.css';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.buttons = {
      profile: {value:"Profile"},
      logout: {value: "Logout"},
      comeAboard: {value: "Come Aboard"},
      galley: {value: "Go to the Galley"}
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    console.log(e.target.value);
    if(e.target.value === 'Go to the Galley') {
      this.props.loggedIn ? this.props.newTab('galley') : alert('You have to be part of the crew to use the Galley');
    } else if(e.target.value === 'Logout') {
      this.props.saveSession();
    }
  }

  render() {
    console.log('-- Home --');  
    const homeButtons = [];

    Object.keys(this.buttons).forEach((part, i, theArray) => {
      
      const name = theArray[i];
      const {value} = this.buttons[name];

      homeButtons.push(
      <input
        key={value}
        className="home-button"
        type="button"
        value={value}
        onClick={this.handleClick}
      />
      );
    });
    return (
      <div className="home">
        {homeButtons}
        <Home_UserInfo />
        <br />
        <Home_Categories />
        <br />
        <br />
        <Home_History />
        <br />
        {/* rank up logout popup */}
        <div className="home-popup">
          <div className="home-popup_content">
            <div className="home-popup_header">
              <span className="close">&times;</span>
              <h2></h2>
            </div>
            <div className="popup-body">
              <img id="popupnewbadge" height="400px" width="230px" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    saveSession: () => dispatch(saveSession())
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);