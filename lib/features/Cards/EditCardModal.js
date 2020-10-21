import React, { useState, } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import Utils from '../../Utils';

export default function EditCardModal(props) {
    console.log('--- EditCardModal ---');
    const cards = useSelector(state => state.cardSlice.cards, shallowEqual);
    const [ editIndex, setEditIndex ] = useState(0);

    const editIdList = props.clickedCards.map( (id) => {
        return  <span key={id} className="editcardmodal-selectionId">{id}</span>;
    });

    const editId = props.clickedCards[editIndex];
    console.log(`edit Id: ${editId}`);
    const editcardindex = Utils.binarySearchForCardId(cards,editId);
    const editcard = cards[editcardindex];
    console.log(`editCard id: ${editcard.card_id} category ${editcard.category}`);


    async function update() {
        // const payload = { 
        //     'card_id': card_id,
        //     'card': localCard, 
        //     'answer': localAnswer, 
        //     'category': localCategory,
        //     'owner_id': owner_id
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
                <textarea value={editcard.card} className="editcardmodal-card" />
                <textarea value={editcard.answer} className="editcardmodal-answer" />
                <input type="button" value="Save" onClick={() => update()} />
                <input type="button" value="Cancel" onClick={() => props.setEditCardModal(false)} />
                <input type="button" value="->" />
                <input type="button" value="<-" />
            </div>
        </div>
    );

}