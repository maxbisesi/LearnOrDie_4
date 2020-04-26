import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
//import "./QuestionPageSheet.css";
// import { saveForReview } from './testSlice';
import { next, asyncUpdateCard, saveForReview, review } from '../Cards/cardSlice';
import { updateSession, incrementQuestionNum } from './testSlice';
import './TestStyle.css';
import RankModal from '../User/RankModal';
import Points from './Points';
import axios from 'axios';

export default function Test() {
    console.log('--- Test ---');
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
    const [cardChanged, setCardChanged] = useState(false);

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
        setCardChanged(false);

        //Change card in store
        dispatch(next({result}));
        //if( started === true ) { dispatch(updateSession({result})); }
        //else { dispatch(updateSession({ 'result':'BEGINSESSION'})); }
    }

    function allClicks(e) {
        // TODO disalbe when card added or user logs in. 
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
        // TODO animation here
        dispatch( asyncUpdateCard(payload) );
    }

    function toggleAnswer() {
      setSeeAnswer(!seeAnswer);
    }

    function comeBack() {
        // Animation so they know it is to reviewed
        saveForReview();
    }

    // Markup
    return (
        <div id="test" style={{position: 'relative'}} onClickCapture={allClicks}>
           {/*<Test_QandA handleChange={handleChange} showAnswer={showAnswer} card={currentCard} answer={currentAnswer} category={currentCategory} />*/}
            <div id="areas">
                <textarea id="localCard" value={localCard} onChange={e => setLocalCard(e.target.value)} rows="20" cols="50" name="card"></textarea>
                <textarea id="localAnswer" value={localAnswer} onChange={e => setLocalAnswer(e.target.value)} rows="20" cols="40" name="answer"></textarea>
                <input id="localCategory" value={localCategory} onChange={e => setLocalCategory(e.target.value)} type="text" name="category" />
            </div>
            <div
                style={{marginTop: 10, marginBottom: 10}}
                id="setdisplay"
            ></div>
            <Points />
            {/*<RankModal show={false} />*/}
            <div id="buttoncontrolgroup">
                <input type="button" id="show" name="show" onClick={toggleAnswer} value="Show"/>
                <input type="button" id="update" value="Update" onClick={handleUpdate}/>
                <input type="button" id="nailed" name="nailed" onClick={nextCard} value="Nailed it"/>
                <input type="button" id="whiffed" name="whiffed" onClick={nextCard} value="Missed it"/>
                <input type="button" id="previous" name="whiffed" onClick={nextCard} value="Previous"/>
                <input type="button" id="comeback" name="comeback" onClick={comeBack} value="Come back to this one!"/>
                <input type="button" id="review" name="review" onClick={review} value="Review" />
                <p>
                    | Rating: <span>{`${correct} / ${incorrect}`}</span> |
                    Card Number: <span>{card_id}</span> |
                    Questions To Review: <span>{reviews.length}</span>|
                </p>
            </div>
        </div>
    );
  
}