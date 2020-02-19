import React, { useState } from "react";
//import './Galley.css';
import { useSelector, shallowEqual } from "react-redux";
import "./GalleyStyle.css";
import GalleyQuestion from "./GalleyQuestion";


export default function Galley(props) {
    console.log('--- Galley ---');
    this.pageOneCards = [];

    const [ clickedQuestion, setClickedQuestions ] = useState([]);

    // Get cards from store
    const cards = useSelector(state => state.cards);
    const pageone = cards.length >= 100 ? 100 : props.cards.length;

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
        if (clickedQuestions.includes(id)) {
            console.log("Question removed");
            setClickedQuestions((qs) => {
                return qs.filter(cardid => cardid !== id);
            });
        } else {
            console.log("Question added");
            setClickedQuestions((qs) => { return [...qs, id] });
        }
    }

    function addToSet(e) {}

    return (
      <div className="galley">
        <h1>{username}</h1>
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
      </div>
    );
  
}


