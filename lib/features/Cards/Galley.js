import React, { useState, } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import GalleyQuestion from "./GalleyQuestion";
import Set from './Set';
import { createCardSet, asyncDeleteCards, sortCardsById } from './cardSlice';
import EditCardModal from './EditCardModal';

export default function Galley(props) {
    console.log('--- Galley ---');

    const existingSets = [];

    const [ clicked, setClicked ] = useState([]);
    const [ showSetModal, setShowSetModal ] = useState(false);
    const [ editCardModal, setEditCardModal ] = useState(false);
    const [ setName, setSetName ] = useState('');
    const [ setDesc, setSetDesc ] = useState('');
    const [ searchVal, setSearchVal ] = useState('');
    const [ showSearched, setShowSearched ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ deleted, setDeleted ] = useState([]);
    const [ searchResults, setSearchResults ] = useState([]);
    
    const dispatch = useDispatch();

    // Get user from the store
    //const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank, guest} = useSelector(state => state.userSlice.user);
    const cardSets = useSelector( state => state.cardSlice.cardSets);
    const studySetIds = useSelector( state => state.cardSlice.studySetIds );
    for (let j =0; j < cardSets.length; j++) {
        let s = cardSets[j].cards.length;
        let d = cardSets[j].description;
        let n = cardSets[j].setname;
        const beingstudied = studySetIds.some( el => el == cardSets[j].set_id);
        existingSets.push(<Set setTab={props.setTab} key={cardSets[j].set_id.toString()} set_id={cardSets[j].set_id} size={s} setname={n} description={d} beingStudied={beingstudied}/>);
    }
    // Get cards from store
    const storeCards = useSelector(state => state.cardSlice.cards, shallowEqual);

    let pageCards = [];

    // ------------- PAGING -------------
    // 445 4 pages 45 cards = 4 pages
    // 0 means page 1
    // This will all be the same whether you're using state cards or search results
    // So the only thing you need to change is where the cards are coming from. 
    // The store or searchResults array ?
    let cards = showSearched ? searchResults : storeCards;
    let pages = Math.floor((cards.length / 100));
    let index = currentPage * 100;
    let pagelength = 100 + index;
    // You're on the last page
    if( currentPage == pages ) { 
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
        let qDeleted = false;
        let card = cards[i];
        if(clicked.includes(card.card_id)) { qClicked = true; }
        if(deleted.includes(card.card_id)) { qDeleted = true; }
        if(qDeleted) { console.log(`cardid:${card.card_id}`); }
        pageCards.push(
            <GalleyQuestion
                addToClicked={addToClicked}
                cardid={card.card_id}
                key={card.card_id}
                card={card.card}
                category={card.category}
                wasClicked={qClicked}
                hasBeenDeleted={qDeleted}
            />
        );
    }
        
    // ------------- ------------- -------------

    function addToClicked(id) {
        if (clicked.includes(id)) {
            setClicked((qs) => {
                return qs.filter(cardid => cardid !== id);
            });
        } else {
            setClicked((qs) => { return [...qs, id]; });
        }
    }

    function saveSet() {
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
                <input id="cardsetnameinput" type="text" value={setName} onChange={(e) => setSetName(e.target.value)} />
                <span className="galley-modalLabel">Description:</span>
                <textarea id="cardsetdescriptiontextarea" value={setDesc} onChange={(e) => setSetDesc(e.target.value)} resize="none" rows="3" cols="80" type="text" />
                <input id="cardsetmodalsavebutton" className="galley-modalButton" type="button" value="Save" onClick={saveSet} />
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

    function deleteCard() {
        let ids = '|';
        clicked.forEach( (d) => { 
            ids+=`  ${d}  `;
            setDeleted((dels) => { return [...dels,d]; });
        });
        ids+='|';
        const res = confirm(`Are you sure you want to delete these cards ?\n${ids}`);
        // TODO animation
        if( res === true) {
            dispatch(asyncDeleteCards(clicked));
        }
    }

    function search(clear) {
        // Clear Search results array
        setSearchResults([]);

        if(clear === 'clear') {
            setSearchVal('');
            setShowSearched(false);
        }else {
            if(searchVal === null || searchVal === '') {return;}
            let res = [];
            let len = storeCards.length;
            console.log(`Search for ${searchVal}`);
            for(let x = 0; x < len; x++) {
                let c = storeCards[x];
                //console.log(`card --->  ${JSON.stringify(c)}`);
                //Search all cards -->
                // Do null check for each . . . TODO NULL CHECk

                if( (c.card !== null && c.card.includes(searchVal)) || 
                        (c.answer !== null && c.answer.includes(searchVal)) || 
                        (c.category !== null && c.category.includes(searchVal))) {
                    
                    console.log(`searched for and found card_id: ${c.card_id}`);
                    res.push(c);
                }
            }
            // Set these new searched results as the state
            // Concat to the old array, since you can guarentee it will cleared above
            setSearchResults(res);
            setShowSearched(true);
        }
        // Pages goes back to 0
        setCurrentPage(0);
    }

    return (
      <div className="galley">
        {/* Card Set creation */}
        <div>
          <ul className="galley-question_table">
              { pageCards }
          </ul>
        </div>
        { showSetModal ? createSetModal : null }
        { editCardModal ? <EditCardModal clickedCards={clicked} setEditCardModal={setEditCardModal} /> : null  }
        <div className="galley-buttons-navigation">
          <input id="previouspage" className="galley-button" type="button" value="<--" onClick={(e) => changePage(e)} />
          <input id="deletecard" className="galley-button" type="button" value="Delete Card" onClick={() => deleteCard()} />
          <input id="savetoset" className="galley-button" type="button" value="Save to Set " onClick={() => setShowSetModal(true)} />
          <input id="editcard" className="galley-button" type="button" value="Edit Card" 
                onClick={ (e) => {
                    dispatch(sortCardsById());
                    setEditCardModal(true);
                }} />
          <input id="nextpage" className="galley-button" type="button" value="-->" onClick={(e) => changePage(e)} />
        </div>
        <div className="galley-searchBar">
            <input value={searchVal}  onChange={(e) => setSearchVal(e.target.value)} id="galleysearchbar" type="search" size="50"/>
            <button id="galleysearch" className="galley-searchbutton" onClick={search} >Search</button>
            <button className="galley-searchbutton" onClick={() => search('clear')} >Clear</button>
        </div>
        <div className="galley-paging">
            <span id="galleypagenumbers" className="galley-pagenumbers">{currentPage} / {pages}</span>
        </div>
        <div className="galley-set-ProgressContainer">
            {clicked.length > 0 ? 
                <div className="galley-set-in_progress">{clicked.length}</div> : 
                <div id="addsomecardstocollection">Add some cards to a collection</div> 
            }
        </div>
        <div className="galley-createdSets-container">
            {existingSets}
        </div>
      </div>
    );
  
}


