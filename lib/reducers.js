//import { login } from "./actions";

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
            return Object.assign({}, state, {cards: cards.concat(action.card)});
        case 'POPULATE_CATEGORIES':
            return;
        default: 
            return state;
    }
}

