import React, { useState, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { next, asyncUpdateCard, saveForReview, review } from '../Cards/cardSlice';
import { updateSession } from './testSlice';
import './TestStyle.css';
import Points from './Points';
import gsap from 'gsap';
import equilateral from '../../Triangles/EQ.png';
import PointAnimation from '../../Graphics/PointAnimation';
import classNames from "classnames";

export default function Test() {
    console.log('-- Test --');
    const dispatch = useDispatch();
    const cardRef = useRef(null);
    const ansRef = useRef(null);

    // Global State
    // leave this selector using strict === equality for re renders, that way you can update the card
    // without a re render, when going to next card you use a new object anyway so it'll work.
    const { card_id, card, answer, category, correct, incorrect, owner_id, collection, image} = useSelector( state => state.cardSlice.currentCard );
    //console.log(`CURRENT CARD: ${card_id}`);
    
    // global state

    // Card Slice
    const reviews =  useSelector( state => state.cardSlice.reviews, shallowEqual );
    const cardCount = useSelector( state => state.cardSlice.cardCount );
    // User Slice
    const user_id = useSelector( state => state.userSlice.user.user_id);
    const loggedIn = useSelector( state => state.userSlice.loggedIn);
    // Test Slice
    // const questionNum = useSelector( state => state.testSlice.questionNum );
    // const { points, streak, rut, streakClass, nailed, whiffed, started } = useSelector( state => state.testSlice.session, shallowEqual);

    // Local state
    // const [reviewDisabled, setReviewDisabled] = useState(true);
    const [seeAnswer, setSeeAnswer] = useState(false);

    // Local card
    const [localCard, setLocalCard] = useState('');
    const [localAnswer, setLocalAnswer] = useState('');
    const [localCategory,setLocalCategory] = useState('');
    const [localCardId, setLocalCardId] = useState('');
    //const [localImage, setLocalImage] = useState({'name':'Equilateral','image':<img className="test-questionImage-equilateral" src={equilateral} />});
    const [localImage, setLocalImage] = useState({ 'name':null, 'image':null });
    
    // Read the session
    // if cardid has changed since last render, that means they moved to the next question so update
    if( localCardId !== card_id ) {
        //Change card locally
        setLocalCard(card);
        setLocalAnswer(answer);
        setLocalCategory(category);
        setLocalCardId(card_id);
        switch(image) {
            case 'Equilateral': 
                setLocalImage({'name':image, 'image': <img src={equilateral} />});
                break;
            default:
                setLocalImage({ 'name':null, 'image':null });
        }
    }
    // If questionNum is greater than zero then they have already started a session so the set the card as the index

    // functions
    function nextCard( e ) { 
        let result = e.target.name;
        setSeeAnswer(false);
        dispatch(next({result}));
        dispatch(updateSession({result}));
    }

    function previousCard(  ) {
        setSeeAnswer(false);
        dispatch(next({'result':'previous'}));
        //dispatch(updateSession({'result':'previous'}));
    } 

    function allClicks(e) {
        if( cardCount > 0 ) {
             console.log(`${e.target.name}`);
         } else { 
            e.stopPropagation(); 
            alert('Add some cards before testing yourself');
         }
    }

    function animComplete() {
        console.log('Update animation completed.');
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
        let cardTl = gsap.timeline({onComplete:animComplete});
        cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#AAFE5B',duration:.5});
        cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#FFFFFF',duration:.5});
        cardTl.play();
        dispatch( asyncUpdateCard(payload) );
    }

    function toggleAnswer() {
      setSeeAnswer(!seeAnswer);
    }

    let testImageClass = classNames({
        "test-questionImage-container": localImage.name !== null,
        "test-noImage": localImage.name === null
    });

    let questionBox = classNames({
        "test-question_answer": true,
        "test-questionBox": localImage.name === null,
        "test-questionBox-Image": localImage.name !== null
    });

    let answerBox = classNames({
        "test-question_answer": true,
        "test-answerBox": true
    });

    console.log('-----------------');
    // Markup
    return (
        <div id="test" style={{position: 'relative'}} onClickCapture={allClicks}>
            <div className="test-areas" id="areas">
                <div className={testImageClass}>
                    { localImage.name === null ? null : localImage.image }
                </div>
                <textarea ref={cardRef} className={questionBox} id="localCard" value={localCard} onChange={e => setLocalCard(e.target.value)} name="card"></textarea>
                <textarea ref={ansRef} className={answerBox} id="localAnswer" value={seeAnswer == true ? localAnswer : 'Click Show'} onChange={e => setLocalAnswer(e.target.value)} name="answer"></textarea>
                <input className="test-category" id="localCategory" value={localCategory} onChange={e => setLocalCategory(e.target.value)} type="text" name="category" />
            </div>
            <div
                style={{marginTop: 10, marginBottom: 10}}
                id="setdisplay"
            ></div>
            <Points />
            <PointAnimation />
            {/*<RankModal show={false} />*/}
            <div className="test-ButtonGroup" id="buttoncontrolgroup">
                <input className="button" type="button" id="showbutton" name="show" onClick={toggleAnswer} value="Show"/>
                <input className="button" type="button" id="updatebutton" value="Update" onClick={handleUpdate}/>
                <input className="button" type="button" id="nailedbutton" name="nailed" onClick={nextCard} value="Nailed it"/>
                <input className="button" type="button" id="whiffedbutton" name="whiffed" onClick={nextCard} value="Missed it"/>
                <input className="button" type="button" id="previousbutton" name="previous" onClick={previousCard} value="Previous"/>
                <input className="button" type="button" id="comebackbutton" name="comeback" onClick={() => dispatch(saveForReview())} value="Come back to this one!"/>
                <input className="button" type="button" id="reviewbutton" name="review" onClick={() => dispatch(review())} value="Review" />
                <p style={{fontSize:23,color:'#ffffff'}}>
                    | Rating: <span id="testrating" style={{fontSize:15}}>{`${correct} / ${incorrect}`}</span> |
                    Card Number: <span id="testcardid" style={{fontSize:15}}>{card_id}</span> |
                    Questions To Review: <span id="questionstoreview" style={{fontSize:15}}>{reviews.length}</span>|
                    <span id="testcardset" className="test-studySet"></span>
                </p>
            </div>
        </div>
    );
  
}