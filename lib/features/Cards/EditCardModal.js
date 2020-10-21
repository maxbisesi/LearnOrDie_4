import React, { useState, } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import {  } from './cardSlice';
import Utils from '../../Utils';

export default function Galley(props) {
    console.log('--- EditCardModal ---');

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
                <div className="editcard-editthesecards">{props.clickedCards}</div>
                <textarea className="editcardmodal-card" />
                <textarea className="editcardmodal-answer" />
                <input type="button" value="Save" onClick={() => update()} />
                <input type="button" value="Cancel" onClick={() => props.setEditCardModal(false)} />
            </div>
        </div>
    );

}