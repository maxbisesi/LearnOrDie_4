import React from 'react';
import { useSelector } from 'react-redux';
import Home_UserInfo from './Home_UserInfo';
import Home_History from './Home_History';
import Home_Categories from './Home_Categories';
import axios from 'axios';
import './HomeStyle.css';

export default function Home(props) {
    const loggedIn = useSelector(state => state.userSliceloggedIn);

    const buttons = {
      logout: {value: "Logout"},
    };
    
    async function handleClick(e) {
        console.log(e.target.value);
         if(e.target.value === 'Logout') {
            // TODO: SAVE SESSION 
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
        <Home_UserInfo />
        <br />
        <Home_Categories />
        <br />
      </div>
    );
}

