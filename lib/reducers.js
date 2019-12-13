//import { login } from "./actions";

//define the state to include what a guest user is
const initialState = { 
    user : {
        user_id: '0',
        username: 'guest_user',
        firstName: 'GUEST',
        lastName: 'GUEST',
        email: 'guestEmail',
        points: 0,
        avatar: 'none',
        guest: true
    }
};

export default function fcs(state = initialState, action) { 
    switch(action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {user:action.user});
        default: 
            return state;
    }
}

