import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
//import "./QuestionPageSheet.css";
// import { saveForReview } from './testSlice';
import { next, update, saveForReview, review } from '../Cards/cardSlice';
//import Points from './Points';
import RankModal from '../User/RankModal';
import Points from './Points';

export default function Test() {
    console.log('--- Test ---');
    const dispatch = useDispatch();

    // Global State
    // leave this selector using strict === equality for re renders, that way you can update the card
    // without a re render, when going to next card you use a new object anyway so it'll work.
    const { cardid, card, answer, category, times_right, times_wrong, owner_id, fk_user_id } = useSelector( state => state.cardSlice.currentCard );
    console.log(`current card in comp: ${cardid}, ${card}, ${answer}, ${category}`);
    
    const reviews =  useSelector( state => state.cardSlice.reviews, shallowEqual );
    const cardCount = useSelector( state => state.cardSlice.cards.length);

    // Local state
    const [reviewDisabled, setReviewDisabled] = useState(true);
    const [seeAnswer, setSeeAnswer] = useState(false);
    const [cardChanged, setCardChanged] = useState(false);

    // Local card
    const [localCard, setLocalCard] = useState('');
    const [localAnswer, setLocalAnswer] = useState('');
    const [localCategory,setLocalCategory] = useState('');

    // functions
    function nextCard(e) { 
        let result = e.target.name;
        setSeeAnswer(false);
        setCardChanged(false);
        // If the user is just getting started, start them gracefully
        /*if(cardid === 'STARTERCARD') { 
            dispatch(next({result:'GETSTARTED'})); 
            setReviewDisabled(false);
            return null;
        }*/
        //Change card in store
        dispatch(next({result}));
        //Change card locally
        setLocalCard(card);
        setLocalAnswer(answer);
        setLocalCategory(category);
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

    function updateCard( e ) { 
        if(cardChanged === true) {
            const newCard = cardInput.current.value;
            const newAns = ansInput.current.value;
            const newCat = catInput.value;
            console.log(`update: ${newCard}, ${newAns}, ${newCat}`);
            // TODO animation here
            const payload = { 
                'cardid': cardid,
                'updCard': newCard, 
                'updAnswer': newAns, 
                'updCat': newCat 
            };

            dispatch(update(payload))
        } else { 
            alert('Make a change first');
        }
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