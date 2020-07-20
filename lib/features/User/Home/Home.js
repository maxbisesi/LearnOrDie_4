import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Home_UserInfo from './Home_UserInfo';
import Home_History from './Home_History';
import Home_Categories from './Home_Categories';
import axios from 'axios';
import { logout } from '../userSlice';
import './HomeStyle.css';

export default function Home(props) {
    const loggedIn = useSelector(state => state.userSlice.loggedIn);
    const user_id = useSelector(state => state.userSlice.user_id);
    const dispatch = useDispatch();

    const buttons = {
      logout: {value: "Logout"},
    };
    
    async function handleClick(e) {
        console.log(e.target.value);
         if(e.target.value === 'Logout') {
          if(user_id === 'GUESTID' || loggedIn === false) { 
              console.log('GOOD BYE GUEST USER!');
              await props.purgeState();
          } else { 
              console.log('logout purge State.');
              dispatch(logout());
              await props.purgeState();
              console.log('State purged. Rerendering.');
              
          }
        } 
    }

    console.log('-- Home --');  
    const homeButtons = [];

    Object.keys(buttons).forEach( (part) => {
      
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

