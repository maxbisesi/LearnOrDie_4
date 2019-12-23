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
        type: 'NEXT',
        currentIndex: index
    };
};

export const updateCards = (updates) => {
    return {
        type: 'UPDATE',
        updates: updates
    };
};

export const saveSession = (session) => {
    return {
        type: 'SAVE_SESSION',
        session: session
    };
};

