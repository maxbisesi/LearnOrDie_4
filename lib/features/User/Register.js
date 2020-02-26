import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import ReactDOM from 'react-dom';
import Main from '../Global/Main';
import './RegisterStyle.css';
import { login } from './userSlice';
//import './registrationPageCustomSheet.css';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
    
  function validateLogin(info) {
      if(password !== confirm) {return false;} 
  }

  function handleChange(event) {
      const target = event.target.name;
      const value = event.target.value;
      switch (target) {
          case 'username': setUsername(value); return;
          case 'password': setPassword(value); return;
          case 'confirmpw': setConfirm(value); return; 
          case 'email': setEmail(value); return;
          default: throw new Error('invalid change target');
      }
  }
    
  async function handleSubmit (event) {
      event.preventDefault();
      try {
          //const loginResponse = await axios.post('/login', { un: this.state.username, pw: this.state.password });
          if (validateLogin() === true) {
              const response = await axios.post('/register', { user: un, pass: pw });
              if (response.status === '200') {
                  // set user as logged 
                  dispatch(login(response.user));
                  this.props.register();
              }
          } else {
              // do something else 
          }
      } catch (e) {
          console.log('ERROR : ' + e);
      }
  }

  return (
    <div className="registration">
      <p id="wa">Welcome Aboard.</p>
      <form
          className="centerRegistrationScreen"
          onSubmit={handleSubmit}
      >
        <p>
          <span id="loginfield">username:</span>{' '}
          <input type="text" name="username" value={username || ''} onChange={handleChange} />
        </p>
        <p>
          <span id="loginfield">password:</span>{' '}
          <input type="password" name="password" value={password || ''} onChange={handleChange} />
        </p>
        <p>
          <span id="loginfield">confirm:</span>{' '}
          <input type="password" name="confirmpw" value={confirm || ''} onChange={handleChange} />
        </p>
        <p>
          <span id="loginfield">Email:</span>{' '}
          <input type="text" name="email" id="emailfield" value={email || ''} onChange={handleChange} />
        </p>
        <p>
          <input type="submit" name="register" value="register" onClick={handleSubmit} />
        </p>
      </form>

      <div>
          <p hidden={noMatch} style={{color:'red', fontSize: 20}}>
            Ooops! those passwords don't match. Try again
          </p>
          <p hidden={userExists} style={{color: 'red', fontSize: 20}}>
            That User already exists{' '}
          </p>
          <p style={{ color: 'crimson' }}>You didn't fill out a required field</p>
      </div>
    </div>
  );
}
