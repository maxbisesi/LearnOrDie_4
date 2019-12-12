//import { login } from "./actions";

//define the state to include what a guest user is
const initialState = { 
    user : {
        firstName: 'GUEST',
        lastName: 'GUEST',
        cards: 0,
        guest: true,
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

