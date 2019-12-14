// action types
//const LOGIN = 'LOGIN';

//actions
export const login = (user) => {
    return { 
        type:'LOGIN', 
        user
    };
};

export const addCard = (card) => {
    return {
        type:'ADD_CARD',
        card
    };
};
