import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addCard } from './cardSlice';
import './ChumStyle.css';

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

    const payload = {'card':card,
                    'answer':answer,
                    'category':category,
                    'owner_id':userId};
                    
    if(userId !== 'GUESTID') {

    }else {
      dispatch(addCard(payload));
    }
    

    // reset form 
    setCard('');
    setAnswer('');
    setCategory('');
  };
  

  return (
    <div className="chum">
      <form onSubmit={submitCard}>
        <div>
          <textarea
            value={card}
            onChange={ (e) => { setCard(e.target.value); }}
            name="card"
            rows="15"
            cols="65"
          ></textarea>
          <br />
          <textarea
            value={answer}
            onChange={ (e) => { setAnswer(e.target.value); }}
            name="answer"
            rows="15"
            cols="65"
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
