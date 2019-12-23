//import { login } from "./actions";
import { getCategoriesFromCards, addToCategory, updateCards}  from './selectors';
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
    currentCard: {id: 'STARTERCARD', card:"Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time it's going to be rough,\nGood Luck! Click either button to get started.", answer: "", category: "",whiffed:0,nailed:0},
    session: {status: 'STARTER',nailed:0, whiffed:0,points: 0, streak: 0, rut: 0}
};

export default function fcs(state = initialState, action) { 
    switch(action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {user:action.user});
        case 'ADD_CARD':
            const cat = action.card.category;
            console.log(`incoming category: ${cat} - `);
            const cats = addToCategory(state.categoryNames,cat);
            return Object.assign({}, state, {cards: state.cards.concat(action.card), categoryNames: cats});
        case 'FILL_CATEGORIES':
            return Object.assign({}, state, getCategoriesFromCards(state.cards));
        case 'NEXT': 
            let next = action.currentIndex;
            return Object.assign({}, state, {currentCard: state.cards[next]});
        case 'RATE':
            return; //Object.assign({}, state, {cards: rateCards(state.cards,action.newRates)});
        case 'SAVE_SESSION':
            return Object.assign({}, state, {session: action.session});
        case 'UPDATE': 
        return Object.assign({}, state, {cards: updateCards(state.cards,action.updates)});
        default: 
            return state;
    }
}

