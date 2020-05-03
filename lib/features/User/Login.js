import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './LoginSyle.css';
import { login, rankup, setSessions } from './userSlice';
import { initAvatar } from './avatarSlice';
import { setCards, fillSets, saveLocalCards, pushCards } from '../Cards/cardSlice'; 
import Profile from './Profile';
import Register from './Register';
import { checkRankUp } from '../../Utils';

export default function Login(props){
  //Local State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Guest');
  const [loginFailed, setLoginFailed] = useState(false);
  const dispatch = useDispatch();

  // global state
  const loggedIn = useSelector(state => state.userSlice.loggedIn);

  function handleRegister(event) {
    console.log('handle register');
    setStatus('Logged In');
  }

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

    const loginResponse = await axios.post('/login', { user: un, pass: pw },config);

    if (loginResponse.status === 200) {
      dispatch(login(loginResponse.data.loggedInUser));
      dispatch(saveLocalCards(loginResponse.data.cards));
      // Set up their Avatar
      //dispatch(initAvatar(loginResponse.data.avatar));
      dispatch(setSessions(loginResponse.data.sessions));
      // Fill the Card Sets
      dispatch(fillSets(loginResponse.data.cardSets));
      setStatus('Logged In');
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
      setStatus('Guest');
      // Display something
    }
  }

  const loginScreen = (
  <div className="login-screen-background">
  <h1 className="login-screen-title">Brave the treachorous Waters..</h1>
  <div className=".login-screen-center">
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
  </div>
  <p className="login-screen-subtitle">...then Learn or Die.</p>
  </div>);

  switch(status) {
    case 'Logged In':return (<Profile />);
    case 'Registering': return (<Register handleRegister={handleRegister} />);
    case 'Guest': return loginScreen ;
    default: return <div>Error: Unkown Status.</div>;
  }
}

