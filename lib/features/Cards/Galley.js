import React, { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import GalleyQuestion from "./GalleyQuestion";
import Set from './Set';
import { createCardSet, studySet } from './cardSlice';

export default function Galley(props) {
    console.log('--- Galley ---');
    // If your effect returns a function, React will run it when it is time to clean up
    const existingSets = [];

    const [ clicked, setClicked ] = useState([]);
    const [ showSetModal, setShowSetModal ] = useState(false);
    const [ setName, setSetName ] = useState('');
    const [ setDesc, setSetDesc ] = useState('');
    const dispatch = useDispatch();
    const [ currentPage, setCurrentPage ] = useState(0);
    
    // Get user from the store
    //const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank, guest} = useSelector(state => state.userSlice.user);
    const cardSets = useSelector( state => state.cardSlice.cardSets);
    // {"set_id":18,"setname":"EMINEM","description":"GO TO SLEEP BITCH","cards":[10,13,16]}
    for (let j =0; j < cardSets.length; j++) {
        let s = cardSets[j].cards.length;
        let d = cardSets[j].description;
        let n = cardSets[j].setname;
        existingSets.push(<Set setTab={props.setTab} key={cardSets[j].set_id.toString()} set_id={cardSets[j].set_id} size={s} setname={n} description={d}/>);
    }
    // Get cards from store
    const cards = useSelector(state => state.cardSlice.cards, shallowEqual);

    let pageCards = [];

    // ------------- PAGING -------------
    // 445 4 pages 45 cards = 4 pages
    const pages = Math.floor((cards.length / 100));
    let index = currentPage * 100;
    let pagelength = 100 + index;
    // You're on the last page
    if( currentPage == pages) { 
        // Figure out cards on last page
        const partialPage = cards.length % 100;
        if(partialPage > 0) {
            // iterate up to the last card
            pagelength = partialPage + index;
        }
    }
    // console.log(`clicked Size: ${clicked.length} - page cards: ${pageCards.length}`);
    for (let i = index; i < pagelength; i++) {
        let qClicked = false;
        let card = cards[i];
        if(clicked.includes(card.card_id)) { qClicked = true; }
        pageCards.push(
            <GalleyQuestion
                addToClicked={addToClicked}
                cardid={card.card_id}
                key={card.card_id}
                card={card.card}
                category={card.category}
                wasClicked={qClicked}
            />
        );
    }
    // ------------- ------------- -------------

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

    function saveSet(e) {
        // Dispatch the action, clear local state
        //  `setname` varchar(15) NOT NULL,
        //  `description` varchar(40) DEFAULT NULL,
        if(setName.length > 15) { 
            alert('Set name too long. 15 is the max/'); 
            return;
        }
        if(setDesc.length > 40) {
            alert('Descripton too long. 40 is the max.');
        }
        dispatch(createCardSet(setName,setDesc,clicked));
        // Create the UI element
        // Close the modal 
        setSetName('');
        setSetDesc('');
        setClicked([]);
        setShowSetModal(false);
    }

    const createSetModal = (
        <div className="galley-modal">
            <div className="galley-modalContent">
                <span className="galley-modalLabel">Card Set Name:</span>
                <input type="text" value={setName} onChange={(e) => setSetName(e.target.value)} />
                <span className="galley-modalLabel">Description:</span>
                <textarea value={setDesc} onChange={(e) => setSetDesc(e.target.value)} resize="none" rows="3" cols="80" type="text" />
                <input className="galley-modalButton" type="button" value="Save" onClick={saveSet} />
                <input className="galley-modalButton" type="button" value="Cancel" onClick={(e) => setShowSetModal(false)} />
            </div>
        </div>
    );

    function changePage(e) {
        if( e.target.value == '<--') {
            if(currentPage == 0) { return; }
            setCurrentPage(prevPage => prevPage - 1);
        } else {
            if(currentPage == pages) { return; }
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    return (
      <div className="galley">
        {/* Card Set creation */}
        <div>
          <ul className="galley-question_table">
              {pageCards}
          </ul>
        </div>
        { showSetModal ? createSetModal : null }
        {  }
        <div className="galley-buttons-navigation">
          <input className="galley-button" type="button" value="<--" onClick={(e) => changePage(e)} />
          <input className="galley-button" type="button" value="Delete" />
          <input className="galley-button" type="button" value="Save" onClick={(e) => setShowSetModal(true)} />
          <input className="galley-button" type="button" value="Share" />
          <input className="galley-button" type="button" value="-->" onClick={(e) => changePage(e)} />
        </div>
        <div className="galley-set-ProgressContainer">
            {clicked.length > 0 ? 
                <div className="galley-set-in_progress">{clicked.length}</div> : 
                <div>Add some cards to a collection</div> 
            }
        </div>
        <div className="galley-createdSets-container">
            {existingSets}
        </div>
      </div>
    );
  
}


