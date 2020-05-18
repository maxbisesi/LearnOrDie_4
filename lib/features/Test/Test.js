import React, { useState, useEffect, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
//import "./QuestionPageSheet.css";
// import { saveForReview } from './testSlice';
import { next, asyncUpdateCard, saveForReview, review } from '../Cards/cardSlice';
import { updateSession } from './testSlice';
import './TestStyle.css';
import RankModal from '../User/RankModal';
import Points from './Points';
import axios from 'axios';

export default function Test() {
    console.log('-- Test --');
    const dispatch = useDispatch();

    // Global State
    // leave this selector using strict === equality for re renders, that way you can update the card
    // without a re render, when going to next card you use a new object anyway so it'll work.
    const { card_id, card, answer, category, correct, incorrect, owner_id} = useSelector( state => state.cardSlice.currentCard );
    console.log(`current card in comp: ${card_id}, ${card}, ${answer}, ${category}`);
    
    // global state

    // Card Slice
    const reviews =  useSelector( state => state.cardSlice.reviews, shallowEqual );
    const cardCount = useSelector( state => state.cardSlice.cardCount );
    // User Slice
    const user_id = useSelector( state => state.userSlice.user.user_id);
    const loggedIn = useSelector( state => state.userSlice.loggedIn);
    // Test Slice
    const questionNum = useSelector( state => state.testSlice.questionNum );
    const { points, streak, rut, streakClass, nailed, whiffed, started } = useSelector( state => state.testSlice.session, shallowEqual);

    // Local state
    const [reviewDisabled, setReviewDisabled] = useState(true);
    const [seeAnswer, setSeeAnswer] = useState(false);

    // Local card
    const [localCard, setLocalCard] = useState('');
    const [localAnswer, setLocalAnswer] = useState('');
    const [localCategory,setLocalCategory] = useState('');
    const [localCardId, setLocalCardId] = useState('');

    // Read the session
    // if cardid has changed since last render, that means they moved to the next question so update
    if( localCardId !== card_id ) {
        //Change card locally
        setLocalCard(card);
        setLocalAnswer(answer);
        setLocalCategory(category);
        setLocalCardId(card_id);
    }
    // If questionNum is greater than zero then they have already started a session so the set the card as the index

    // functions
    function nextCard( e ) { 
        let result = e.target.name;
        setSeeAnswer(false);
        dispatch(next({result}));
        dispatch(updateSession({result}));
    }

    function allClicks(e) {
        if( cardCount > 0 ) {
             console.log(`Card Count: ${cardCount}`);
         } else { 
            e.stopPropagation(); 
            alert('Add some cards before testing yourself');
         }
    }

    function handleUpdate() { 
        if(localCard === card 
            && localAnswer === answer 
            && localCategory === category) { 
                alert('make a change first'); 
                return;
            }
        const payload = { 
            'card_id': card_id,
            'card': localCard, 
            'answer': localAnswer, 
            'category': localCategory,
            'owner_id': owner_id
        };
        // If they don't own the card then they can't update it
        if(owner_id !== user_id) {
            alert(' You can only update your cards. ');
            return;
        }
        if( user_id === 'GUESTID' || loggedIn === false){
            alert(' Login or register to update your questions.');
            return;
        }
        console.log(`Update card: ${JSON.stringify(payload)}`);
        alert(`Question: ${card_id} updated !`);
        dispatch( asyncUpdateCard(payload) );
    }

    function toggleAnswer() {
      setSeeAnswer(!seeAnswer);
    }

    // Markup
    return (
        <div id="test" style={{position: 'relative'}} onClickCapture={allClicks}>
           {/*<Test_QandA handleChange={handleChange} showAnswer={showAnswer} card={currentCard} answer={currentAnswer} category={currentCategory} />*/}
            <div id="areas">
                <textarea className="test-questionBox" id="localCard" value={localCard} onChange={e => setLocalCard(e.target.value)} rows="30" cols="60" name="card"></textarea>
                <textarea className="test-questionBox" id="localAnswer" value={seeAnswer == true ? localAnswer : 'Click Show'} onChange={e => setLocalAnswer(e.target.value)} rows="30" cols="60" name="answer"></textarea>
                <input id="localCategory" value={localCategory} onChange={e => setLocalCategory(e.target.value)} type="text" name="category" />
            </div>
            <div
                style={{marginTop: 10, marginBottom: 10}}
                id="setdisplay"
            ></div>
            <Points />
            {/*<RankModal show={false} />*/}
            <div id="buttoncontrolgroup">
                <input className="button" type="button" id="show" name="show" onClick={toggleAnswer} value="Show"/>
                <input className="button" type="button" id="update" value="Update" onClick={handleUpdate}/>
                <input className="button" type="button" id="nailed" name="nailed" onClick={nextCard} value="Nailed it"/>
                <input className="button" type="button" id="whiffed" name="whiffed" onClick={nextCard} value="Missed it"/>
                <input className="button" type="button" id="previous" name="whiffed" onClick={nextCard} value="Previous"/>
                <input className="button" type="button" id="comeback" name="comeback" onClick={() => dispatch(saveForReview())} value="Come back to this one!"/>
                <input className="button" type="button" id="review" name="review" onClick={() => dispatch(review())} value="Review" />
                <p style={{fontSize:23,color:'#ffffff'}}>
                    | Rating: <span style={{fontSize:15}}>{`${correct} / ${incorrect}`}</span> |
                    Card Number: <span style={{fontSize:15}}>{card_id}</span> |
                    Questions To Review: <span style={{fontSize:15}}>{reviews.length}</span>|
                    <span className="test-studySet"></span>
                </p>
            </div>
        </div>
    );
  
}