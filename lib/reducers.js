//import { login } from "./actions";
import { getCategoriesFromCards, addToCategory, updateCards, getSession}  from './selectors';
//define the state to include what a guest user is
const initialState = { 
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
    cards: [
        {id: 'id1', card:"card1", answer: "an1", category: "cat1",whiffed:0, nailed:0},
        {id: 'id2',card:"card2", answer: "an2", category: "cat2",whiffed:0, nailed:0},
        {id: 'id3',card:"card3", answer: "an3", category: "cat3",whiffed:0, nailed:0},
        {id: 'id4', card:"card4", answer: "an4", category: "cat4",whiffed:0, nailed:0},
        {id: 'id5',card:"card5", answer: "an5", category: "cat5",whiffed:0, nailed:0},
        {id: 'id6',card:"card6", answer: "an6", category: "cat6",whiffed:0, nailed:0},
        {id: 'id7', card:"card7", answer: "an7", category: "cat7",whiffed:0, nailed:0},
        {id: 'id8',card:"card8", answer: "an8", category: "cat8",whiffed:0, nailed:0},
        {id: 'id9',card:"card9", answer: "an9", category: "cat9",whiffed:0, nailed:0}
    ],
    currentCard:  {id: 'STARTERCARD', card:"Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time it's going to be rough,\nGood Luck! Click either button to get started.", answer: "", category: "",whiffed:0,nailed:0},
    session: {points: 0, streak: 0, rut: 0, streakClass:''},
    history: {total:0, nailed:0, whiffed:0}
};

export default function fcs(state = initialState, action) { 
    switch(action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {user:action.user});
        case 'ADD_CARD':
            const cat = action.card.category;
            const cats = addToCategory(state.categoryNames,cat);
            return Object.assign({}, state, {cards: state.cards.concat(action.card), categoryNames: cats});
        case 'FILL_CATEGORIES':
            return Object.assign({}, state, getCategoriesFromCards(state.cards));
        case 'NEXT': 
            // get the result of the next click
            let result = action.result;
            // If the user is just getting started, exit them from the starter card gracefully
            if( result === 'GETSTARTED' ) {
                return Object.assign({},state,{index: 0, currentCard: state.cards[0]});
            }
            //Keep track of history
            let newHistory = Object.assign({},state.history);
            newHistory[result] += 1;
            newHistory.total += 1;
            // copy index and increase it
            let newIndex = state.index;
            newIndex+=1;
            //keep track of ratings on cards
            let newCards = state.cards.map( (item) => { 
                if (item.id !== state.currentCard.id){ return item; }
                else { 
                    let res = item[result];
                    res += 1;
                    return Object.assign( {},item, { [result]:res } ); 
                }
            });
            // if index is now more than cards length, go back to zero
            if( newIndex >= newCards.length) { newIndex = 0; }
            // pass the result to selector to obtain new session object
            let newSesh = getSession(result,state.session);
            // Change the state based on these new values
            return Object.assign({},state,{index: newIndex, currentCard: newCards[newIndex], session: newSesh, cards: newCards, history: newHistory });
        case 'SAVE_SESSION':
            return Object.assign({}, state, {session: action.session});
        case 'UPDATE': 
            return Object.assign({}, state, {cards: updateCards(state.cards,action.updates)});
        case 'SET_CARDS':
            return Object.assign({}, state, {cards: action.cards});
        default: 
            return state;
    }
}

