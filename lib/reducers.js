//import { login } from "./actions";
import { getCategoriesFromCards, addToCategory, rateCard}  from './selectors';
//define the state to include what a guest user is
const initialState = { 
    user : {
        user_id: '0',
        userName: 'guest_user',
        firstName: 'GUEST',
        lastName: 'GUEST',
        email: 'guestEmail',
        points: 0,
        cardCount: 0,
        rank: 'GUEST',
        guest: true
    },
    categoryNames: {},
    cards: [
        {id: 'id1', card:"card1", answer: "an1", category: "cat1",whiffed:0, nailed:0},
        {id: 'id2',card:"card2", answer: "an2", category: "cat2",whiffed:0, nailed:0},
        {id: 'id3',card:"card3", answer: "an3", category: "cat3",whiffed:0, nailed:0}
    ],
    currentCard: {id: '0', card:"", answer: "", category: ""}
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
            let i = action.currentIn;
            let next = ++i;
            return Object.assign({}, state, {currentCard: state.cards[next], cards: rateCard(state.cards,action)});
        case 'NAIL': return;
        default: 
            return state;
    }
}

