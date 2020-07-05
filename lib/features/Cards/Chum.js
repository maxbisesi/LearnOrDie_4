import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { insertCard } from './cardSlice';
import './ChumStyle.css';
import gsap from 'gsap';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default function Chum() {
  console.log('--- Chum ---');
  const dispatch = useDispatch();
  // functional state
  const [card, setCard] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const cardRef = useRef(null);
  const ansRef = useRef(null);

  // If the user is logged in set their fk_user_id rn, other wise leave it undefined.
  // If not logged in userId = GUESTID
  const userId = useSelector(state => state.userSlice.user.user_id);
  
  function animComplete() {
    console.log('chum animation completed.');
  }

  function submitCard() {
    let cardTl = gsap.timeline({onComplete:animComplete});
    cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#AAFE5B',duration:.5});
    cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#FFFFFF',duration:.5});
    // cardTl.timeScale(2);

    const payload = {'card_id':'GUESTCARD',
                    'card':card,
                    'answer':answer,
                    'category':category,
                    'owner_id':userId};
                    
    dispatch(insertCard(payload));
    // reset form 
    cardTl.play();
    setCard('');
    setAnswer('');
  }
  
  return (
      <KeyboardEventHandler 
        onKeyEvent={submitCard}
        handleKeys={['ctrl+enter']} >
      <div className="chum">
      <div>
        <textarea
          className="chumQuestion"
          value={card}
          onChange={ (e) => { setCard(e.target.value); }}
          name="card"
          rows="20"
          cols="105"
          ref={cardRef}
        ></textarea>
        <br />
        <textarea
          className="chumQuestion"
          value={answer}
          onChange={ (e) => { setAnswer(e.target.value); }}
          name="answer"
          rows="20"
          cols="105"
          ref={ansRef}
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
      <input type="submit" name="submit" value="submit" id="submit" onClick={submitCard} />
    </div></KeyboardEventHandler>);
}
