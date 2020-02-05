//import { login } from "./actions";
import { getCategoriesFromCards, addToCategory, updateCards, getSession}  from './selectors';
import axios from 'axios';
import { RankObserver } from './rank';
//define the state to include what a guest user is
const initialState = { 
    loggedIn: false,
    user : {
        user_id: '0',
        userName: 'guest_user',
        firstName: 'GUEST',
        lastName: 'GUEST',
        email: 'guestEmail',
        totalPoints: 0,
        cardCount: 0,
        rank: 'GUEST',
        guest: true
    },
    categoryNames: {},
    index: 0,
    cards: [],
    newCards: [],
    currentCard:  {cardid: 'STARTERCARD', card:"Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time it's going to be rough,\nGood Luck! Click either button to get started.", answer: "", category: "",times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
    session: {points: 0, streak: 0, rut: 0, streakClass:'', nailed:0, whiffed:0},
    history: [],
    reviews: [],
    //add this to the DB
    profile: {experience: 'guest'}
};

const rankobserver = new RankObserver();
export default function fcs(state = initialState, action) { 
    switch(action.type) {
        case 'LOGIN':
            rankobserver.notify();
            return Object.assign({}, state, {user:action.user, loggedIn: true});
        case 'ADD_CARD':
            const cat = action.card.category;
            const cats = addToCategory(state.categoryNames,cat);
            return Object.assign({}, state, {cards: state.cards.concat(action.card), categoryNames: cats, newCards: state.newCards.concat(action.card)});
        case 'FILL_CATEGORIES':
            return Object.assign({}, state, getCategoriesFromCards(state.cards));
        case 'NEXT': 
            // get the result of the next click
            let result = action.result;
            console.log(`Next result: ${result}`);
            // If the user is just getting started, exit them from the starter card gracefully
            if( result === 'GETSTARTED' ) {
                return Object.assign({},state,{index: 0, currentCard: state.cards[0]});
            }
            //Keep track of history
            let newHistory;
            if(state.history.length === 0) {
                // No history yet
                newHistory = new Array();
                const his = { 'cardid': state.currentCard.cardid, 'nailed':0, 'whiffed':0 };
                his[result] = his[result] + 1;
                newHistory.push(his);
            } else {
                // See if you arleady have a history for this card.
                let historyContainsItem = false;
                newHistory = state.history.map((item) => {
                    if(item.cardid !== state.currentCard.cardid) { return item;}  
                    else { 
                        historyContainsItem = true;
                        let res = item[result];
                        res += 1;
                        return Object.assign( {},item, { [result]:res } ); 
                    }
                });
                // If not add it in there.
                if(historyContainsItem === false) {
                    const his_02 = { 'cardid': state.currentCard.cardid, 'nailed':0, 'whiffed':0 };
                    his_02[result] = his_02[result] + 1;
                    newHistory.push(his_02);
                }
            }
            // copy index and increase it
            let newIndex = state.index;
            newIndex+=1;
            //keep track of ratings on cards
            if(result !== 'nailed' && result !== 'whiffed') { throw new Error('Reducer Next: unkonwn rating'); }
            const cardRating = result === 'nailed' ? 'times_right' : 'times_wrong';
            let newCards = state.cards.map( (item) => { 
                if (item.cardid !== state.currentCard.cardid){ return item; }
                else { 
                    let res = item[cardRating];
                    res += 1;
                    return Object.assign( {},item, { [cardRating]:res } ); 
                }
            });
            // if index is now more than cards length, go back to zero
            // TODO And also get the next page of cards.
            if( newIndex >= newCards.length ) { 
                newIndex = 0; 
            }
            // pass the result to selector to obtain new session object
            let newSesh = getSession(result,state.session);
            // Change the state based on these new values
            return Object.assign({},state,{index: newIndex, currentCard: newCards[newIndex], session: newSesh, cards: newCards, history: newHistory });
        case 'UPDATE': 
            // Handle the update right here, so you don't have to when saving the database.
            axios.post('/updateCards', {cards:action.updates} );
            return Object.assign({}, state, {cards: updateCards(state.cards,action.updates)});
        case 'SET_CARDS':
            //console.log(`Reducers SET_CARDS cards -> ${action.cards.length}`);
            return Object.assign({}, state, {cards: action.cards});
        case `SAVE_REVIEWS`:
            return Object.assign({}, state, {reviews: state.reviews.concat(state.currentCard.cardid)});
        case `REVIEW`:
            const newReviews = state.reviews.slice(0);
            let nextReview = newReviews.pop();
            const reviewCard = state.cards.find(card => card.cardid === nextReview );
            return Object.assign({}, state, {reviews: newReviews, currentCard: reviewCard});
        case `SAVE_SESSION`: 
            if(state.loggedIn === false) {
                // Do nothing, return staet unchanged.
                return state;
            }
            axios.post('/saveStateToDB',{ user: state.user, data: state.history, cards: state.newCards });
            //clear the history after saving it.
            return Object.assign({}, state, { history: [] });
        default: 
            return state;
    }
}

