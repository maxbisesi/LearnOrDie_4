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

export const nextCard = (result) => {
    return {
        type: 'NEXT',
        result: result
    };
};

export const updateCards = (updates) => {
    return {
        type: 'UPDATE',
        updates: updates
    };
}

export const saveSession = (session) => {
    return {
        type: 'SAVE_SESSION',
        session: session
    }
};

export const setCards = (cards) => {
    return {
        type: 'SET_CARDS',
        cards: cards
    }
}

