import React, { useReducer, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { insertCard } from './cardSlice';
import MathModule from '../Modules/MathModule';
import './ChumStyle.css';
import gsap from 'gsap';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default function Chum() {
  console.log('--- Chum ---');
  const dispatch = useDispatch();
  /* functional state
  const [card, setCard] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(''); */

  const cardRef = useRef(null);
  const ansRef = useRef(null);

  // If the user is logged in set their fk_user_id rn, other wise leave it undefined.
  // If not logged in userId = GUESTID
  const userId = useSelector(state => state.userSlice.user.user_id);
  const mathmodule = useSelector(state => state.userSlice.modules.mathmodule, shallowEqual); 

  function animComplete() {
    console.log('chum animation completed.');
  }

  function submitCard() {
    let cardTl = gsap.timeline({onComplete:animComplete});
    cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#AAFE5B',duration:.5});
    cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#FFFFFF',duration:.5});
    // cardTl.timeScale(2);

    const payload = {'card_id':'GUESTCARD',
                    'card':state.card,
                    'answer':state.answer,
                    'category':state.category,
                    'owner_id':userId,
                    'collection':null};
                    
    dispatch(insertCard(payload));
    // reset form 
    cardTl.play();
    localDispatch({'type':'clearQandA'});
  }

  function insertCharacter(cha) {
    switch(state.focusedInput) {
      case `card`: localDispatch({'type':'insertValueToCard', 'character': cha}); break;
      case `answer`: localDispatch({'type':'insertValueToFocusedInput', 'character': cha}); break;
      case `category`: localDispatch({'type':'insertValueToCategory', 'character': cha}); break;
    }
  }

  let initialState = {'card':'','answer':'','category':'','focusedInput':''};
  function reducer(state, action) {
    let val;
    switch (action.type) {
      case 'setAnswer': 
        return {...state, 'answer': action.value };
      case 'setCard':         
        return {...state, 'card': action.value };
      case 'setCategory': 
        return {...state, 'category': action.value }; 
      case 'clearQandA': return {...state, 'card':'', 'answer':''};
      case `setFocusedInput`: return {...state, 'focusedInput':action.value};
      case `insertValueToCard`: 
        val = state.card;
        val += action.character;
        return {...state, 'card': val };
      case `insertValueToAnswer`: 
        val = state.card;
        val += action.character;
        return {...state, 'answer': val };
      case `insertValueToCategory`: 
        val = state.card;
        val += action.character;
        return {...state, 'category': val };
      default:
        throw new Error('Unkown Action in Chum state Reducer.');
    }
  }

  const [state, localDispatch] = useReducer(reducer, initialState);
  
  return (
      <KeyboardEventHandler 
        onKeyEvent={submitCard}
        handleKeys={['ctrl+enter']} >
      <div className="chum">
        <textarea
          className="chumQuestion"
          value={state.card || ""}
          onChange={ (e) => { localDispatch({'type':'setCard', 'value': e.target.value}); } }
          name="card"
          rows="20"
          cols={mathmodule.active === true ? 95 : 105}
          ref={cardRef}
          onFocus={ (e) => localDispatch({ 'type':'setFocusedInput', 'value': e.target.name }) }
        ></textarea>
        <br />
        <textarea
          className="chumQuestion"
          value={state.answer || ""}
          onChange={ (e) => { localDispatch({'type':'setAnswer', 'value':e.target.value}); } }
          onFocus={ (e) => localDispatch({ 'type':'setFocusedInput', 'value': e.target.name }) }
          name="answer"
          rows="20"
          cols={mathmodule.active === true ? 95 : 105}
          ref={ansRef}
        ></textarea>
        <div className="rightsidegraphic">
          { mathmodule.active === true ? <MathModule insertCharacter={insertCharacter}/> : null }
        </div>
      <br />
      <span>Category:</span>
      <input
        value={state.category || ""}
        type="text"
        name="category"
        onChange={ (e) => { localDispatch({'type':'setCategory', 'value':e.target.value}); } }
        onFocus={ (e) => localDispatch({ 'type':'setFocusedInput', 'value': e.target.name }) }
      />
      <input type="submit" name="submit" value="submit" id="submit" onClick={submitCard} />
    </div></KeyboardEventHandler>);
}
