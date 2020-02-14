import React, { useState } from "react";
//import axios from "axios";
//import "./QuestionPageSheet.css";
//import PropTypes from "prop-types";
import { addCard } from './cardsSlice';
import { useDispatch } from 'react-redux';
import './Styles/Chum.css';

export default function Chum(props) {
  // functional state
  const [card, setCard] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  const submitCard = (e) => {
    e.preventDefault();
    console.log(`State in handleSubmit, before ${JSON.stringify(this.state)}`);
    /*cardid:'id1',answer: 'card1',',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id2',answer: 'card1',card:'',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0 */
    // If the user is logged in set their fk_user_id rn, other wise leave it undefined.
    const loggedIn = useSelector(state => state.loggedIn);
    let userId = undefined;
    if(loggedIn === true) {
      userId = useSelector(state => state.user.user_id);
    }
    const payload = {'cardid':undefined,
                    'card':card,
                    'answer':answer,
                    'category':category,
                    'times_right':0,
                    'times_wrong':0,
                    'owner_id':0,
                    'fk_user_id':userId
                  };
    useDispatch(addCard(payload));
  }

  return (
    <div className="chum">
      <form onSubmit={this.submitCard}>
        <div>
          <textarea
            value={card}
            onChange={ (e) => { setCard(e.target.value) } }
            name="card"
            rows="15"
            cols="65"
          ></textarea>
          <br />
          <textarea
            value={answer}
            onChange={ (e) => { setCard(e.target.value) } }
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
          onChange={(e) => { setCard(e.target.value) }}
        />
        <input type="submit" name="submit" value="submit" id="submit" />
      </form>
    </div>
}
