import React, { useState, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import Utils from '../../Utils';

export default function EditCardModal(props) {
    console.log('--- EditCardModal ---');

    const cards = useSelector(state => state.cardSlice.cards, shallowEqual);
    const [ editIndex, setEditIndex ] = useState(0);
    const [ firstCard, setFirstCard ] = useState(true);

    // Local card
    const [localCard, setLocalCard] = useState('');
    const [localAnswer, setLocalAnswer] = useState('');
    const [localCategory,setLocalCategory] = useState('');
    const [localCardId, setLocalCardId] = useState('');

    const cardRef = useRef(null);
    const ansRef = useRef(null);

    const editIdList = props.clickedCards.map( (id) => {
        return  <span key={id} className="editcardmodal-selectionId">{id}</span>;
    });
    
    if( firstCard ) {
        const editId = props.clickedCards[0];
        console.log(`First Card edit Id: ${editId}`);
        const editcardindex = Utils.binarySearchForCardId(cards,editId);
        const editcard = cards[editcardindex];
        console.log(`First Card editCard id: ${editcard.card_id} category ${editcard.category}`);
        setLocalCard(editcard.card);
        setLocalAnswer(editcard.answer);
        setLocalCategory(editcard.category);
        setLocalCardId(editcard.card_id);
        setFirstCard(false);
        if(editIndex < props.clickedCards.length) {
            setEditIndex(editIndex + 1);
        } else {
            setEditIndex(0);
        }
    }

    function next() {
        const editId = props.clickedCards[editIndex];
        console.log(`edit Id: ${editId}`);
        const editcardindex = Utils.binarySearchForCardId(cards,editId);
        const editcard = cards[editcardindex];
        console.log(`editCard id: ${editcard.card_id} category ${editcard.category}`);
        setLocalCard(editcard.card);
        setLocalAnswer(editcard.answer);
        setLocalCategory(editcard.category);
        setLocalCardId(editcard.card_id);
        if(editIndex < props.clickedCards.length) {
            setEditIndex(editIndex + 1);
        } else {
            setEditIndex(0);
        }
    }

    async function update() {
        // const payload = { 
        //     'card_id': editcard.card_id,
        //     'card': editcard.card, 
        //     'answer': editcard.answer, 
        //     'category': editcard.category,
        //     'owner_id': editcard.owner_id
        // };
        // // If they don't own the card then they can't update it
        // if(owner_id !== user_id) {
        //     alert(' You can only update your cards. ');
        //     return;
        // }
        // if( user_id === 'GUESTID' || loggedIn === false){
        //     alert(' Login or register to update your questions.');
        //     return;
        // }
        // console.log(`Update card: ${JSON.stringify(payload)}`);
        // let cardTl = gsap.timeline({onComplete:animComplete});
        // cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#AAFE5B',duration:.5});
        // cardTl.to([ansRef.current,cardRef.current],{backgroundColor:'#FFFFFF',duration:.5});
        // cardTl.play();
        // dispatch( asyncUpdateCard(payload) );
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