import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { insertCard } from './cardSlice';
import './ChumStyle.css';
import urchin from './urchin.png';
import { CSSTransition } from 'react-transition-group';

export default function Chum() {
  console.log('--- Chum ---');
  const dispatch = useDispatch();
  // functional state
  const [card, setCard] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [showUrchin, setShowUrchin] = useState(false);

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
    setShowUrchin(!showUrchin);
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
        <span>Category:</span>
        <input
          value={category}
          type="text"
          name="category"
          onChange={(e) => { setCategory(e.target.value); }}
        />
        <input type="submit" name="submit" value="submit" id="submit" />
        <CSSTransition
          in={showUrchin}
          timeout={{ enter: 500, exit: 500 }}
          classNames="urchin" >
            {/*<img src={urchin} alt="fireSpot"/>*/}
            <div>Show or not ?</div>
        </CSSTransition>
      </form>
    </div>);
}
