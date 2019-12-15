//import { login } from "./actions";
import { countCategories, addToCategory}  from './selectors'
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
    categories : [],
    cards: []
};

export default function fcs(state = initialState, action) { 
    switch(action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {user:action.user});
        case 'ADD_CARD':
            return Object.assign({}, state, {cards: state.cards.concat(action.card)});
        case 'UPDATE_CATEGORIES':
            return Object.assign({}, state, countCategories(state.cards));
        case 'ADD_CATEGORY':
            return Object.assign({}, state, addToCategory(state.categories,action.category));
        default: 
            return state;
    }
}

