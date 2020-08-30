import React, { useReducer, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { insertCard } from './cardSlice';
import MathModule from '../Modules/MathModule';
import './ChumStyle.css';
import gsap from 'gsap';
import equilateral from '../../Triangles/EQ.png';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import classNames from "classnames";

export default function Chum() {
  console.log('--- Chum ---');

  const dispatch = useDispatch();
  const availableShapes = ['Equilateral','Right','Circle','Square'];
  
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
                    'collection':null
                  };

    if(state.shape.name!== null&&availableShapes.includes(state.shape.name)&&state.shape.image !== null) {
      console.log(`inserting shape: ${state.shape.name}`);
      payload.image = state.shape.name;
    }
        
    dispatch(insertCard(payload));
    // reset form 
    cardTl.play();
    localDispatch({'type':'clearQandA'});
  }

  function insertCharacter(cha) {
    switch(state.focusedInput) {
      case `card`: localDispatch({'type':'insertValueToCard', 'character': cha}); break;
      case `answer`: localDispatch({'type':'insertValueToAnswer', 'character': cha}); break;
      case `category`: localDispatch({'type':'insertValueToCategory', 'character': cha}); break;
    }
  }

  function addShape(shapeName) {
    switch(shapeName) {
      case 'Equilateral': 
        localDispatch({'type':'addShape','value':'Equilateral'});
        break;
      default: throw new Error('Chum: Unknown image type.');
    }
  }

  let initialState = {'card':'','answer':'','category':'','focusedInput':'','shape':{'name':null,'image':null}};

  function reducer(state, action) {
    console.log(`local Chum reducer - current State: ${state}`);
    console.log(`local Chum reducer - dispatched action: ${action}`);
    console.log(``);
    let val;
    switch (action.type) {
      case 'setAnswer': 
        return {...state, 'answer': action.value };
      case 'setCard':         
        return {...state, 'card': action.value };
      case 'setCategory': 
        return {...state, 'category': action.value }; 
      case 'clearQandA': return {...state, 'card':'', 'answer':'', 'shape':{'name':null,'image':null}};
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
      case `addShape`:
        return {...state, 
                  'shape': { 
                    'name':action.value,
                    'image': <img className="chum-questionImage-equilateral" src={equilateral} /> 
                  } 
              };
      case 'removeShape': return {...state,'shape':{'name':null,'image':null}};
      default:
        throw new Error('Unkown Action in Chum state Reducer.');
    }
  }

  const [state, localDispatch] = useReducer(reducer, initialState);

  // there's 3 lengths for the question box
  // 1 just the box
  // 2 the box and an image
  // 4 the box the module and an image
  let chumQuestionClass = classNames({
    "chum-question": true,
    "chum-question-image": state.shape.name !== null
  });

  let chumImageClass = classNames({
    "chum-questionImage-container": state.shape.name !== null,
    "chum-noImage": state.shape.name === null
  });

  return (
      <KeyboardEventHandler 
        onKeyEvent={submitCard}
        handleKeys={['ctrl+enter']} >
      <div className="chum">
        <div className={chumImageClass} onClick={() => { localDispatch({'type':'removeShape'}); }}>
          { state.shape.name === null ? null : state.shape.image }
        </div>
        <textarea
          id="chumcard"
          className={chumQuestionClass}
          value={state.card || ""}
          onChange={ (e) => { localDispatch({'type':'setCard', 'value': e.target.value}); } }
          name="card"
          ref={cardRef}
          onFocus={ (e) => localDispatch({ 'type':'setFocusedInput', 'value': e.target.name }) }
        ></textarea>
        <br />
        <textarea
          id="chumanswer"
          className="chum-answer"
          value={state.answer || ""}
          onChange={ (e) => { localDispatch({'type':'setAnswer', 'value':e.target.value}); } }
          onFocus={ (e) => localDispatch({ 'type':'setFocusedInput', 'value': e.target.name }) }
          name="answer"
          ref={ansRef}
        ></textarea>
        <div className="rightsidegraphic">
          { mathmodule.active === true ? <MathModule addShape={addShape} insertCharacter={insertCharacter}/> : null }
        </div>
      <br />
      <span>Category:</span>
      <input
        value={state.category || ""}
        id="chumcategory"
        type="text"
        name="category"
        onChange={ (e) => { localDispatch({'type':'setCategory', 'value':e.target.value}); } }
        onFocus={ (e) => localDispatch({ 'type':'setFocusedInput', 'value': e.target.name }) }
      />
      <input id="chumsubmit" type="submit" name="submit" value="Submit" onClick={submitCard} />
    </div></KeyboardEventHandler>);
}
