// action types
//const LOGIN = 'LOGIN';

//actions
export const loginAction = (user) => {
    return { 
        type:'LOGIN', 
        user
    };
};

export const addCardAction = (card) => {
    return {
        type:'ADD_CARD',
        card
    };
};

export const nextCard = (index,result) => {
    return {
        type: 'WHIFF',
        currentIn: index,
        result: result
    };
};

