import React from 'react';
import { useSelector } from 'react-redux';
import Home_UserInfoFN from './Home_UserInfoFN';
import Home_CategoriesFN from './Home_CategoriesFN';
import Home_HistoryFN from './Home_HistoryFN';
import { saveSession } from '../userSlice';
import './HomeStyle.css';

export default function HomeFN(props) {
    const loggedIn = useSelector(state => state.loggedIn);

    const buttons = {
      profile: {value:"Profile"},
      logout: {value: "Logout"},
      comeAboard: {value: "Come Aboard"},
      galley: {value: "Go to the Galley"}
    };


    function handleClick(e) {
        console.log(e.target.value);
        if(e.target.value === 'Go to the Galley') {
            loggedIn ? props.newTab('galley') : alert('You have to be part of the crew to use the Galley');
        } else if(e.target.value === 'Logout') {
            saveSession();
        }
    }

    console.log('-- Home --');  
    const homeButtons = [];

    Object.keys(buttons).forEach( (part, i, theArray) => {
      
      const name = part;
      const {value} = buttons[name];

      homeButtons.push(
        <input
            key={value}
            className="home-button"
            type="button"
            value={value}
            onClick={handleClick}
        />
      );

    });

    return (
      <div className="home">
        {homeButtons}
        <Home_UserInfoFN />
        <br />
        <Home_CategoriesFN />
        <br />
        <br />
        <Home_HistoryFN />
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

