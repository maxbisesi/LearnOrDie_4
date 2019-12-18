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

export const nextCard = (index) => {
    return {
        type: 'WHIFF',
        currentIn: index
    };
};

export const rateCard = (index,result) => {
    return {
        type: 'RATE',
        currentIndex: index,
        result: result
    };
}

