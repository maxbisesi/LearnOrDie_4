import React, { useState, useSelector, useCallback } from "react";
//import "./QuestionPageSheet.css";
// import { saveForReview } from './testSlice';
import { next, update, saveForReview, review } from './../Cards/cardsSlice';
import Test_QandA from './Test_QandA';
import Points from './Points';
import RankModal from '../User/RankModal';
import { connect } from 'react-redux';

export default function Test_FN(props) {
    console.log('--- Test ---');

    // Global State
    const currentCardId = useSelector( state => state.currentCard.cardid )
    const currentCard = useSelector( state => state.currentCard.card );   
    const currentAnswer = useSelector( state => state.currentCard.answer );
    const currentCategory = useSelector( state => state.currentCard.category );
    const reviews = useSelector( state => state.reviews );
    // Local State
    const [updates, setUpdates] = useState({});
    const [reviewDisabled, setReviewDisabled] = useState(true);
    const [seeAnswer, setSeeAnswer] = useState(false);
    const [localCard, setLocalCard] = useState('');   
    const [localAnswer, setLocalAnswer] = useState('');
    const [localCategory, setLocalCategory]= useState('');

    function nextCard(e) { 
        console.log('next card');
        let result = e.target.name;

        //Send result to Points componenent
        // If the user is just getting started, start them gracefully
        if(currentCard.cardid === 'STARTERCARD') { next('GETSTARTED'); return null; }
        next(result);
    }

    function allClicks(e) {
        // TODO disalbe when card added or user logs in. 
        e.stopPropagation();
        alert('Add some cards before testing yourself');
    }

    const handleUnload = useEffect((e) => { 
        console.log(`State on unmount: ${JSON.stringify(currentCard)}`);
        if(Object.keys(updates).length > 0) { update(updates); } 
    });

    useEffect(() => {
        window.addEventListener('beforeunload',handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    });

    function updateCard(e) { 
        // TODO animation here
        const updatedCard = { 
            'cardid': currentCardId,
            'card': localCard, 
            'answer': localAnswer, 
            'category': localCategory 
        };

        setUpdates((prev) => {
            return Object.assign({},prev,updatedCard);
        });
    }

    function handleChange({ target }){
        let targ = target.name;
        console.log(`local state: ${targ} -- ${target.value}`);
        if(targ === 'card'){ setLocalCard(target.value); }
        if(targ === 'answer'){ setLocalAnswer(target.value); }
        if(targ === 'category'){ setLocalCategory(target.value); }
    }

    function toggleAnswer() {
      setSeeAnswer(!seeAnswer);
    }

    function comeBack() {
        // Animation so they know it is to reviewed
        // Do nothing if cardid is included
        if(reviews.includes(currentCardId)) { return; }
        saveForReview(currentCardId);
    }
    
    function review() {

    }

    return (
        <div id="test" style={{position: 'relative'}} onClickCapture={allClicks}>
           {/*<Test_QandA handleChange={handleChange} showAnswer={showAnswer} card={currentCard} answer={currentAnswer} category={currentCategory} />*/}
            <div id="areas">
                <textarea value={currentCard} onChange={handleChange} rows="20" cols="50" name="card"></textarea>
                <textarea value={showAnswer ? currentAnswer : 'Click Show'} onChange={handleChange} rows="20" cols="40" name="answer"></textarea>
                <input value={currentCategory} onChange={this.props.handleChange} type="text" name="category" />
            </div>
            <div
                style={{marginTop: 10, marginBottom: 10}}
                id="setdisplay"
            ></div>
            <Points />
            <RankModal show={false} />
            <div id="buttoncontrolgroup">
                <input type="button" name="show" onClick={toggleAnswer} value="Show"/>
                <input type="button" id="update" value="Update" onClick={updateCard}/>
                <input type="button" name="nailed" onClick={this.nextCard} value="Nailed it"/>
                <input type="button" name="whiffed" onClick={this.nextCard} value="Missed it"/>
                <input type="button" name="whiffed" onClick={this.previousCard} value="Previous"/>
                <input type="button" name="comeback" onClick={this.comeBack} value="Come back to this one!"/>
                <input type="button" name="review" onClick={review} value="Review" />
                <p>
                    | Rating: <span>{0}</span> |
                    Card Number: <span>{currentCardId}</span> |
                    Questions To Review: <span>{reviews.length}</span>|
                </p>
            </div>
        </div>
    );
  
}