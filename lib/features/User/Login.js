import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './LoginSyle.css';
import { login, setCards } from './userSlice';
import Profile from "./Profile";
import Register from './Register';

export default function Login(props){

  //Local State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Guest');
  const [loginFailed, setLoginFailed] = useState('');
  const dispatch = useDispatch();

  // global state
  const loggedIn = useSelector(state => state.userSlice.loggedIn);

  function handleRegister(event) {
    console.log('handle register');
    setStatus('Logged In');
  }

  async function handleSubmit(event) {

    event.preventDefault();
    const config = {
      validateStatus: function (status) {
        if(status === 200 || status === 401 || status === 403) { return true; }
        return false;
      }
    };

    let un = username;
    let pw = password;

    const loginResponse = await axios.post('/login', { user: un, pass: pw },config);
    console.log(`Login Response: ${JSON.stringify(loginResponse)}`);

    if (loginResponse.status === 200) {
      // Get the cards and catgories for this user
      dispatch(setCards(loginResponse.data.cards));
      dispatch(login(loginResponse.data.loggedInUser));
      setStatus('Logged In');
    }

    if (loginResponse.status === 401) {
      // wrong password
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
          value={username}
          onChange={(e) => { setUsername(e.target.value); }}
          className="login-input"
        />
      </p>
      <p>
        password:{' '}
        <input
          type="password"
          name="pass"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          className="login-input"
        />
      </p>

      <input type="submit" value="Login" id="loginbutton" className="login-loginbutton" />
      <input onClick={(e) => { setStatus('Registering'); }} type="button" value="Come Aboard" className="login-loginbutton" />
    </form>
    <div hidden={loginFailed}>Invalid login data try again.</div>
  </div>
  <p className="login-screen-subtitle">...then Learn or Die.</p>
  </div>);

  switch(status) {
    case 'Logged In':return (<Profile />);
    case 'Registering': return (<Register register={handleRegister} />);
    case 'Guest': return loginScreen ;
    default: return <div>Error: Unkown Status.</div>
  } 
}
