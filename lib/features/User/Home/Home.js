import React from 'react';
import { useSelector } from 'react-redux';
import Home_UserInfo from './Home_UserInfo';
import Home_History from './Home_History';
import Home_Categories from './Home_Categories';
import axios from 'axios';
import './HomeStyle.css';

export default function Home(props) {
    const loggedIn = useSelector(state => state.userSlice.loggedIn);

    const buttons = {
      logout: {value: "Logout"},
    };
    
    async function handleClick(e) {
        console.log(e.target.value);
         if(e.target.value === 'Logout') {
          if(user_id === 'GUESTID' || loggedIn === false) { 
            console.log('GOOD BYE GUEST USER!');
        } else { 
            const userSesh =  { 'correct': nailed,'incorrect': whiffed,'cards_added': cardsAdded,'points_added': points,'card_sets_added': 0,'user_id': user_id };
            // await axios.post('/saveSession',{'session':userSesh,'user':user}); 
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

