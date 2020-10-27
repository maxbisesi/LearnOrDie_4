import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import Utils from '../../Utils';
import { asyncUpdateCard } from './cardSlice';
import gsap from 'gsap';

export default function EditCardModal(props) {

    console.log('--- EditCardModal ---');
    const dispatch = useDispatch();

    const cards = useSelector(state => state.cardSlice.cards, shallowEqual);
    const user = useSelector(state => state.userSlice.user, shallowEqual);
    const loggedIn = useSelector(state => state.userSlice.loggedIn, shallowEqual);

    const [ editIndex, setEditIndex ] = useState(0);
    // const [ firstCard, setFirstCard ] = useState(true);

    // Local card
    const [localCard, setLocalCard] = useState('');
    const [localAnswer, setLocalAnswer] = useState('');
    const [localCategory,setLocalCategory] = useState('');
    const [localCardId, setLocalCardId] = useState('');
    const [ localCardOwnerId, setLocalCardOwnerId ] = useState('');

    const cardRef = useRef(null);
    const ansRef = useRef(null);

    const editIdList = props.clickedCards.map( (id) => {
        return  <span key={id} className="editcardmodal-selectionId">{id}</span>;
    });


    useEffect(() => {
        console.log(`useEffect()`);
        const cardId = props.clickedCards[editIndex];
        console.log(`edit Id: ${cardId}`);
        const editcardindex = Utils.binarySearchForCardId(cards,cardId);
        console.log(`editcardindex: ${editcardindex}`);
        const editcard = cards[editcardindex];
        console.log(`editcard id: ${editcard.card_id} category ${editcard.category}`);
        setLocalCard(editcard.card);
        setLocalAnswer(editcard.answer);
        setLocalCategory(editcard.category);
        setLocalCardId(editcard.card_id);
        setLocalCardOwnerId(editcard.owner_id);
    },[editIndex]);


    function next() {
        console.log(`edit index in next(): ${editIndex}`);
        // clicked cards = 5 editIndex = 4
        // clicked cards = 5 editIndex = 3
        const nextInd = editIndex + 1;
        // clicked cards = 5 editIndex = 5
        // clicked cards = 5 editIndex = 4
        if(nextInd < props.clickedCards.length) {
            setEditIndex(editIndex + 1);
        } else {
            setEditIndex(0);
            // clicked cards = 5 editIndex = 0
        }
    }

    async function update() {
        const payload = { 
            'card_id': localCardId,
            'card': localCard, 
            'answer': localAnswer, 
            'category': localCategory,
            'owner_id': localCardOwnerId
        };
        // If they don't own the card then they can't update it
        if(localCardOwnerId !== user.user_id) {
            alert(' You can only update your cards. ');
            return;
        }
        if( user.user_id === 'GUESTID' || loggedIn === false){
            alert(' Login or register to update your questions.');
            return;
        }
        console.log(`Update card: ${JSON.stringify(payload)}`);
        let cardTl = gsap.timeline();
        cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#AAFE5B',duration:.5});
        cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#FFFFFF',duration:.5});
        cardTl.play();
        dispatch( asyncUpdateCard(payload) );
    }

    return (
        <div className="editcard-modal">
            <div className="editcard-modalContent"> 
                <div className="editcard-editthesecards">{editIdList}</div>
                <textarea onChange={e => setLocalCard(e.target.value)} value={localCard} className="editcardmodal-card" ref={cardRef}/>
                <textarea onChange={e => setLocalAnswer(e.target.value)} value={localAnswer} className="editcardmodal-answer" ref={ansRef}/>
                <input id="localCategory" value={localCategory} onChange={e => setLocalCategory(e.target.value)} type="text" name="category" />
                <input type="button" value="Save" onClick={() => update()} />
                <input type="button" value="Cancel" onClick={() => props.setEditCardModal(false)} />
                <input type="button" value="->" onClick={next} />
                <input type="button" value="<-" />
            </div>
        </div>
    );

}