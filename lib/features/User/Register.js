import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './RegisterStyle.css';
import { login } from './userSlice';
import { initAvatar } from './avatarSlice';
import Unknown from '../../Graphics/unknownAvatar';
import './AvatarStyle.css';
import Fcs1 from './Characters/Fcs1';
import { fail } from 'assert';
import { saveLocalCards } from '../Cards/cardSlice';

export default function Register(props) {
  console.log('--- Register ---');

  // local state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [primaryWeapon,setPrimaryWeapon] = useState('');
  const [birthStar, setBirthStar] = useState('');
  const [charStyle, setCharStyle] = useState('');

  // Form Validation
  const [noMatch, setNoMatch] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [missingField, setMissingField] = useState(false);

  // Character State
  const characters = useSelector(state => state.avatarSlice.availableCharacters, shallowEqual);
  const primaryWeapons = useSelector(state => state.avatarSlice.availableWeapons, shallowEqual);
  const birthStars = useSelector(state => state.avatarSlice.availableBirthStars, shallowEqual);
  const styles = useSelector(state => state.avatarSlice.availableStyles, shallowEqual);

  const charOptions = [];
  const primaryWeaponOptions = [];
  const birthStarOptions = [];
  const styleOptions = [];

  characters.forEach( (part, i, theArray) => { charOptions.push( <option value={part}>{part}</option> ); });
  primaryWeapons.forEach( (part, i, theArray) => { primaryWeaponOptions.push( <option key={part} value={part}>{part}</option> ); });
  birthStars.forEach( (part, i, theArray) => { birthStarOptions.push(<option key={part} value={part}>{part}</option>); });
  styles.forEach( (part, i, theArray) => { styleOptions.push(<option key={part} value={part}>{part}</option>); });

  const dispatch = useDispatch();
    
  function validateLogin() {
      if(password !== confirm) {
        setNoMatch(true); 
        setUserExists(false);
        return false;
      } else { return true; } 
  }
    
  async function handleSubmit (event) {
    // SERVER RESPONSES
    // 204 Username already exists.
    event.preventDefault();
    try {
      if (validateLogin() === true) {
        /**
         *  'user': username,
            'pass': password, 
            'email': email,
            'avatar': avatar,
            'weapon':primaryWeapon, 
            'birthstar':birthStar, 
            'style':charStyle });
         */
        const response = await axios.post('/register', { 'user': username,
                                                         'pass': password, 
                                                         'email': email, });

        if (response.status === 200) {
          const userpayload = response.data.user;
          //const avPayload = {'avatar' : response.data.avatar};
          // set user as logged in
          dispatch(login(userpayload));
          dispatch(saveLocalCards());
          //dispatch(initAvatar(avPayload));
          // Sets the status in Login to 'Logged In; that way their profile will appear next time.
          props.handleRegister();
        }
        else if (response.status == 400) {
          // Username exists..
          console.log('username exists.');
          setUserExists(true);
        } else {
          fail();
        }
      } 
    } catch (e) {
        console.log('Registration ERROR : ' + e);
    }
  }

    return (
      <div className="registration">
        <p id="wa">Welcome Aboard.</p>
        <form
            className="centerRegistrationScreen"
        >
          <p>
            <span id="loginfield">username:</span>{' '}
            <input type="text" value={username || ''} onChange={e => setUsername(e.target.value)} />
          </p>
          <p>
            <span id="loginfield">password:</span>{' '}
            <input type="password" value={password || ''} onChange={e => setPassword(e.target.value)} />
          </p>
          <p>
            <span id="loginfield">confirm:</span>{' '}
            <input type="password" value={confirm || ''} onChange={e => setConfirm(e.target.value)} />
          </p>
          <p>
            <span id="loginfield">Email:</span>{' '}
            <input type="text" name="email" id="emailfield" value={email || ''} onChange={e => setEmail(e.target.value)} />
          </p>
          <p>
            <input type="submit" name="register" value="Choose Your Destiny" onClick={handleSubmit} />
          </p>
        </form>
        {/**NEEDS WORK TODO */}
        {/*
        <div className="avatar-character-options">
            <select value={primaryWeapon} onChange={e => setPrimaryWeapon(e.target.value)}>
                {primaryWeaponOptions}
            </select>
            <select value={birthStar} onChange={e => setBirthStar(e.target.value)}>
                {birthStarOptions}
            </select>   
            <select value={charStyle} onChange={e => setCharStyle(e.target.value)}>
                {styleOptions}
            </select> 
        </div>
        <div className="avatar-grid-container">
            <div onClick={e => setAvatar('1')} className="avatar-grid-item"><Unknown /></div>
            <div onClick={e => setAvatar('2')} className="avatar-grid-item"><Unknown /></div>
            <div onClick={e => setAvatar('3')} className="avatar-grid-item"><Unknown /></div>  
            <div onClick={e => setAvatar('4')} className="avatar-grid-item"><Unknown /></div>
            <div onClick={e => setAvatar('5')} className="avatar-grid-item"><Unknown /></div>
            <div onClick={e => setAvatar('6')} className="avatar-grid-item"><Unknown /></div>
        </div>
        <div className="avatar-char-inprogress">
            <Fcs1 />
        </div>
        */}
        <div>
          <p hidden={!noMatch} style={{color:'red', fontSize: 20}}>
            Ooops! those passwords don't match. Try again
          </p>
          <p hidden={!userExists} style={{color: 'red', fontSize: 20}}>
            That User already exists
          </p>
          <p hidden={!missingField} style={{ color: 'crimson' }}>You didn't fill out a required field</p>
        </div>
      </div>);

}
