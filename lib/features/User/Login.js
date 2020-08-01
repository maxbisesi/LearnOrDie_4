import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './LoginSyle.css';
import { login } from './userSlice';
import { fillSets, saveLocalCards } from '../Cards/cardSlice'; 
import Profile from './Profile';
import Register from './Register';
import { CSSTransition } from 'react-transition-group';

export default function Login(props){
  console.log('-- Login --');
  //Local State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('login');
  const [loginFailed, setLoginFailed] = useState(false);
  const dispatch = useDispatch();

  // global state
  const loggedIn = useSelector(state => state.userSlice.loggedIn);
  
  async function handleSubmit(event) {
    event.preventDefault();
    // Overrides default axios config to allow returning 400 statuses.
    const config = {
      validateStatus: function (status) {
        if(status === 200 || status === 401 || status === 403) { return true; }
        return false;
      }
    };

    let un = username;
    let pw = password;

    const loginResponse = await axios.post('/login', { user: un, pass: pw }, config);

    if (loginResponse.status === 200) {
      dispatch(login(loginResponse.data.loggedInUser));
      // After login, use saveLocalCards to catch any cards they may have added before loggin in.
      dispatch(saveLocalCards(loginResponse.data.cards));
      // Set up their Avatar
      //dispatch(initAvatar(loginResponse.data.avatar));
      //dispatch(setSessions(loginResponse.data.sessions));
      // Fill the Card Sets
      let csc = loginResponse.data.cardSetCards;
      let csdata = loginResponse.data.cardSetData;
      Object.keys(csc).forEach((setid) => csdata[setid]['cards'] = csc[setid]);
      dispatch(fillSets(Object.values(csdata)));
    }

    if (loginResponse.status === 401) {
      // wrong password
      setLoginFailed(true);
      //TODO Do something with context here
    }

    if (loginResponse.status === 403) {
      // username not found
      // TODO do something with context here
      console.log('User not found');
      setUsername('');
      setPassword('');
      setLoginFailed(true);
      // Display something
    }
  }

  const loginScreen = (
  <div className="login-screen-background">
  <h1 className="login-screen-title">Brave the treachorous Waters..</h1>
    <div className="login-screen-center">
      <form onSubmit={handleSubmit}>
        <p>
          username:{' '}
          <input
            type="text"
            name="user"
            title="username"
            value={username}
            onChange={(e) => { setUsername(e.target.value);}}
            className="login-input"
          />
        </p>
        <p>
          password:{' '}
          <input
            type="password"
            name="pass"
            title="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
            className="login-input"
          />
        </p>

        <input type="submit" title="submit" value="Login" id="loginbutton" className="login-loginbutton" />
        <input onClick={(e) => { setStatus('Registering'); }} type="button" value="Come Aboard" className="login-loginbutton" />
      </form>
      <div hidden={!loginFailed}>Invalid login data try again.</div>
      <CSSTransition
        timeout={2000}
        classNames="subtitle" 
        appear={true} 
        in={true}
      >
        <p key="lod" >...then Learn or Die.</p>
      </CSSTransition>
    </div>
  </div>);

  if(loggedIn === true) { 
    return <Profile />;
  } else {
    if( status === 'login' ){
      return loginScreen;
    } else {
      return <Register />;
    }  
  }
}

