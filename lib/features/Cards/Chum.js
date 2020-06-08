import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { insertCard } from './cardSlice';
import './ChumStyle.css';
import { gsap } from 'gsap';

export default function Chum() {
  console.log('--- Chum ---');
  const dispatch = useDispatch();
  // functional state
  const [card, setCard] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  // If the user is logged in set their fk_user_id rn, other wise leave it undefined.
  // If not logged in userId = GUESTID
  const userId = useSelector(state => state.userSlice.user.user_id);
  
  const submitCard = (e) => {
    e.preventDefault();

    const payload = {'card_id':'GUESTCARD',
                    'card':card,
                    'answer':answer,
                    'category':category,
                    'owner_id':userId};
                    
    dispatch(insertCard(payload));
    
    // reset form 
    setCard('');
    setAnswer('');
    // Leave category stangnant while chuming
    // setCategory('');
  };
  

  return (
    <div className="chum">
      <form onSubmit={submitCard}>
        <div>
          <textarea
            className="chumQuestion"
            value={card}
            onChange={ (e) => { setCard(e.target.value); }}
            name="card"
            rows="20"
            cols="105"
          ></textarea>
          <br />
          <textarea
            className="chumQuestion"
            value={answer}
            onChange={ (e) => { setAnswer(e.target.value); }}
            name="answer"
            rows="20"
            cols="105"
          ></textarea>
        </div>
        <br />
        <input type="hidden" name="name" value="submit" />
        <span>Category:</span>
        <input
          value={category}
          type="text"
          name="category"
          onChange={(e) => { setCategory(e.target.value); }}
        />
        <input type="submit" name="submit" value="submit" id="submit" />
      </form>
    </div>);
}
