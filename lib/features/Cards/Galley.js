import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import "./GalleyStyle.css";
import GalleyQuestion from "./GalleyQuestion";
import Set from './Set';

export default function Galley(props) {
    console.log('--- Galley ---');
    const pageOneCards = [];

    const [ clicked, setClicked ] = useState([]);

    // Get cards from store
    const cards = useSelector(state => state.cardSlice.cards, shallowEqual);
    const pageone = cards.length >= 100 ? 100 : cards.length;

    // Get user from the store
    const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank, guest} = useSelector(state => state.userSlice.user);
    // See how shallow equal works 
    //console.log(`${user_id}, ${userName}, ${firstName}, ${lastName}, ${email}, ${totalPoints}, ${cardCount}, ${rank}, ${guest}`);
    for (let i = 0; i < pageone; i++) {
        let card = cards[i];
        pageOneCards.push(
            <GalleyQuestion
                addToClicked={addToClicked}
                key={card.cardid}
                cardid={card.cardid}
                card={card.card}
                category={card.category}
            />
        );
    }
    
    function handleCardClick(e) {
        const clickedID = e.currentTarget.getAttribute("data-cardid");
        console.log(`Clicked ID current target: ${clickedID}`);
    }

    function handleMouseEnter(e) {
        console.log("mouse enter");
    }

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

    function addToSet(e) {}

    return (
      <div className="galley">
        <h1>{userName}</h1>
        {/* Card Set creation */}
        <div>
          <ul className="galley-question_table">
              {pageOneCards}
          </ul>
        </div>

        <div className="galley-buttons-navigation">
          <input className="galley-button" type="button" value="<--" />
          <input className="galley-button" type="button" value="-->" />
          <input
            className="galley-button"
            type="button"
            value="Add To Set"
            onClick={addToSet}
          />
          <input className="galley-button" type="button" value="Delete" />
          <input className="galley-button" type="button" value="Add" />
          <input className="galley-button" type="button" value="Delete" />
        </div>
        {clicked.length > 0 ? <Set size={clicked.length}/>: <div>Add some cards to a collection</div> }
      </div>
    );
  
}


