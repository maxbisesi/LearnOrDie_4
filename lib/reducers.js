//import { login } from "./actions";
import { getCategoriesFromCards, addToCategory}  from './selectors'
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
    cards: []
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
        default: 
            return state;
    }
}

