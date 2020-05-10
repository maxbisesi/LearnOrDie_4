import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import GalleyQuestion from "./GalleyQuestion";
import Set from './Set';
import { createCardSet } from './cardSlice';

export default function Galley(props) {
    console.log('--- Galley ---');
    const pageOneCards = [];
    const [ clicked, setClicked ] = useState([]);
    const [ showSetModal, setShowSetModal ] = useState(false);
    const dispatch = useDispatch();

    // Get cards from store
    const cards = useSelector(state => state.cardSlice.cards, shallowEqual);
    const pageone = cards.length >= 100 ? 100 : cards.length;

    // Get user from the store
    const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank, guest} = useSelector(state => state.userSlice.user);
    for (let i = 0; i < pageone; i++) {
        let card = cards[i];
        pageOneCards.push(
            <GalleyQuestion
                addToClicked={addToClicked}
                cardid={card.card_id}
                key={`id-${card.card_id}`}
                card={card.card}
                category={card.category}
            />
        );
    }
    
    //const clickedID = e.currentTarget.getAttribute("data-cardid");

    function addToClicked(id) {
        if (clicked.includes(id)) {
            console.log("Question removed");
            setClicked((qs) => {
                return qs.filter(cardid => cardid !== id);
            });
        } else {
            console.log("Question added");
            setClicked((qs) => { return [...qs, id] });
        }
    }

    const setModal = (
        <div className="galley-modal">
            <div className="galley-modalContent">
                <span className="galley-modalLabel">Card Set Name:</span>
                <input type="text" />
                <span className="galley-modalLabel">Description:</span>
                <textarea resize="none" rows="3" cols="80" type="text" />
                <input className="galley-modalButton" type="button" value="Save" onClick={(e) => setShowSetModal(false)} />
            </div>
        </div>
    );

    return (
      <div className="galley">
        <h1>{userName}</h1>
        {/* Card Set creation */}
        <div>
          <ul className="galley-question_table">
              {pageOneCards}
          </ul>
        </div>
        { showSetModal ? setModal : null }
        <div className="galley-buttons-navigation">
          <input className="galley-button" type="button" value="<--" />
          <input className="galley-button" type="button" value="-->" />
          <input className="galley-button" type="button" value="Delete" />
          <input className="galley-button" type="button" value="Save" onClick={(e) => setShowSetModal(true)} />
          <input className="galley-button" type="button" value="Delete" />
        </div>
        <div className="galley-set-container">
            {clicked.length > 0 ? <Set size={clicked.length}/>: <div>Add some cards to a collection</div> }
        </div>
      </div>
    );
  
}


