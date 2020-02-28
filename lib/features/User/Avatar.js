import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './AvatarStyle.css';
import Unknown from '../../Graphics/unknownAvatar';
import { char1 } from './Characters/characters';

export default function Avatar(props) {

    // Local State
    const [primaryWeapon, setPrimaryWeapon] = useState('');
    const [secondWeapon, setSecondWeapon] = useState('');
    const [birthStar, setBirthStar] = useState('');
    const [charStyle, setCharStyle] = useState('');

    const characters = useSelector(state => state.avatarSlice.characters, shallowEqual);
    const primaryWeapons = useSelector(state => state.avatarSlice.primaryWeapons, shallowEqual);
    const secondWeapons = useSelector(state => state.avatarSlice.secondWeapons, shallowEqual);
    const birthStars = useSelector(state => state.avatarSlice.birthStars, shallowEqual);
    const styles = useSelector(state => state.avatarSlice.charStyles, shallowEqual);

    const charOptions = [];
    const primaryWeaponOptions = [];
    const secondWeaponOptions = [];
    const birthStarOptions = [];
    const styleOptions = [];

    characters.forEach( (part, i, theArray) => { charOptions.push( <option value={part}>{part}</option> ); });
    let unknownChars = 9 - charOptions.length;
    for(let i = 0; i < unknownChars; i++){
        charOptions.push(<div className="avatar-grid-item"><Unknown /></div>);
    }
    primaryWeapons.forEach( (part, i, theArray) => { primaryWeaponOptions.push( <option value={part}>{part}</option> ); });
    secondWeapons.forEach( (part, i, theArray) => { secondWeaponOptions.push( <option value={part}>{part}</option> ); });
    birthStars.forEach( (part, i, theArray) => { birthStarOptions.push(<option value={part}>{part}</option>); });
    styles.forEach( (part, i, theArray) => { styleOptions.push(<option value={part}>{part}</option>); });
    

    function handleChange( e ) {
        
    }

    return (
        <>
            <div>
                <select value={primaryWeapon} onChange={e => setPrimaryWeapon(e.target.value)}>
                    {primaryWeaponOptions}
                </select>
                <select value={secondWeapon} onChange={e => setSecondWeapon(e.target.value)}>
                    {secondWeaponOptions}
                </select>
                <select value={birthStar} onChange={e => setBirthStar(e.target.value)}>
                    {birthStarOptions}
                </select>   
                <select value={charStyle} onChange={e => setCharStyle(e.target.value)}>
                    {styleOptions}
                </select> 
            </div>
            <div className="avatar-grid-container">
                <div className="avatar-grid-item"><Unknown /></div>
                <div className="avatar-grid-item"><Unknown /></div>
                <div className="avatar-grid-item"><Unknown /></div>  
                <div className="avatar-grid-item"><Unknown /></div>
                <div className="avatar-grid-item"><Unknown /></div>
                <div className="avatar-grid-item"><Unknown /></div>  
                <div className="avatar-grid-item"><Unknown /></div>
                <div className="avatar-grid-item"><Unknown /></div>
                <div className="avatar-grid-item"><Unknown /></div>  
            </div>
            <input type="Button" value="Choose your destiny" />
        </>
        );
}