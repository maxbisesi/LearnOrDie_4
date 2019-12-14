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
    categories : [
        {catid: '1', name: 'Whales', rating: '12', count: 6, filter: false},
        {catid: '2', name: 'Dolphins', rating: '7', count: 3, filter: false},
        {catid: '3', name: 'Sharks', rating: '2', count: 2, filter: false}
    ]
};

export default function fcs(state = initialState, action) { 
    switch(action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {user:action.user});
        default: 
            return state;
    }
}

