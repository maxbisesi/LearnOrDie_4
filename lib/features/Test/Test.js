import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
//import "./QuestionPageSheet.css";
// import { saveForReview } from './testSlice';
import { next, update, saveForReview, review } from '../Cards/cardSlice';
import { updateSession, incrementQuestionNum } from './testSlice';
//import Points from './Points';
import RankModal from '../User/RankModal';
import Points from './Points';
import axios from 'axios';

export default function Test() {
    console.log('--- Test ---');
    const dispatch = useDispatch();

    // Global State
    // leave this selector using strict === equality for re renders, that way you can update the card
    // without a re render, when going to next card you use a new object anyway so it'll work.
    const { cardid, card, answer, category, times_right, times_wrong, owner_id, fk_user_id } = useSelector( state => state.cardSlice.currentCard );
    console.log(`current card in comp: ${cardid}, ${card}, ${answer}, ${category}`);
    
    // global state
    // Card State
    const reviews =  useSelector( state => state.cardSlice.reviews, shallowEqual );
    const cardCount = useSelector( state => state.cardSlice.cards.length);

    // Test State
    const questionNum = useSelector( state => state.testSlice.questionNum );
    const { points, streak, rut, streakClass, nailed, whiffed, sessionStarted } = useSelector( state => state.testSlice.session, shallowEqual);

    // Local state
    const [reviewDisabled, setReviewDisabled] = useState(true);
    const [seeAnswer, setSeeAnswer] = useState(false);
    const [cardChanged, setCardChanged] = useState(false);
    const [updates,setUpdates] = useState([]);

    // Local card
    const [localCard, setLocalCard] = useState('');
    const [localAnswer, setLocalAnswer] = useState('');
    const [localCategory,setLocalCategory] = useState('');
    const [localCardId, setLocalCardId] = useState('');

    // Read the session
    // if cardid has changed since last render, that means they moved to the next question so update
    if( localCardId !== cardid ) {
        //Change card locally
        setLocalCard(card);
        setLocalAnswer(answer);
        setLocalCategory(category);
        setLocalCardId(cardid);
    }
    // If questionNum is greater than zero then they have already started a session so the set the card as the index

    // functions
    function nextCard( e ) { 
        let result = e.target.name;
        setSeeAnswer(false);
        setCardChanged(false);

        //Change card in store
        dispatch(next({result}));
        if( sessionStarted === true ) { dispatch(updateSession({result})); }
        else { dispatch(updateSession({ 'result':'BEGINSESSION'})); }
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

    function updateCard() { 
        if(localCard !== card 
            && localAnswer !== answer 
            && localCategory !== category) { 
                alert('make a change first'); 
                return;
            }

        // TODO animation here

        const payload = { 
            'cardid': cardid,
            'updCard': localCard, 
            'updAnswer': localAnswer, 
            'updCat': localCategory 
        };

        dispatch(update(payload));
        // oldArray => [...oldArray, newElement]
        setUpdates(ups => [...ups, payload]);
    }

    function toggleAnswer() {
      setSeeAnswer(!seeAnswer);
    }

    function comeBack() {
        // Animation so they know it is to reviewed
        saveForReview();
    }

    useEffect( () => { 
        // TODO what if a user tries to update a new card ?
        async function updateCards() {
            if( updates.length > 0 ) { 
                await axios.post('/updateCards', {cards: updates} ); 
            }
        }

        updateCards();
    }, [updates]);

    // Markup
    return (
        <div id="test" style={{position: 'relative'}} onClickCapture={allClicks}>
           {/*<Test_QandA handleChange={handleChange} showAnswer={showAnswer} card={currentCard} answer={currentAnswer} category={currentCategory} />*/}
            <div id="areas">
                <textarea value={localCard} onChange={e => setLocalCard(e.target.value)} rows="20" cols="50" name="card"></textarea>
                <textarea value={localAnswer} onChange={e => setLocalAnswer(e.target.value)} rows="20" cols="40" name="answer"></textarea>
                <input value={localCategory} onChange={e => setLocalCategory(e.target.value)} type="text" name="category" />
            </div>
            <div
                style={{marginTop: 10, marginBottom: 10}}
                id="setdisplay"
            ></div>
            <Points />
            {/*<RankModal show={false} />*/}
            <div id="buttoncontrolgroup">
                <input type="button" name="show" onClick={toggleAnswer} value="Show"/>
                <input type="button" id="update" value="Update" onClick={updateCard}/>
                <input type="button" name="nailed" onClick={nextCard} value="Nailed it"/>
                <input type="button" name="whiffed" onClick={nextCard} value="Missed it"/>
                <input type="button" name="whiffed" onClick={nextCard} value="Previous"/>
                <input type="button" name="comeback" onClick={comeBack} value="Come back to this one!"/>
                <input type="button" name="review" onClick={review} value="Review" />
                <p>
                    | Rating: <span>{`${times_right} / ${times_wrong}`}</span> |
                    Card Number: <span>{cardid}</span> |
                    Questions To Review: <span>{reviews.length}</span>|
                </p>
            </div>
        </div>
    );
  
}