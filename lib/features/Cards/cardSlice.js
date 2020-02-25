import { createSlice } from '@reduxjs/toolkit';

/*{
  name: "todos",
  reducer: (state, action) => newState,
  actions: {
    addTodo: (payload) => ({type: "todos/addTodo", payload}),
    toggleTodo: (payload) => ({type: "todos/toggleTodo", payload})
  },
  caseReducers: {
    addTodo: (state, action) => newState,
    toggleTodo: (state, action) => newState,
  }
}*/

const cardSlice = createSlice({
    name: 'card',
    initialState: { 
        index: 0,
        cards:[], 
        categories: {},
        newCards: [],     
        currentCard: {'cardid': 'STARTER', 
                        'card':`Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time
                                         it's going to be rough,\nGood Luck! Click either button to get started.`,
                       'answer':'',
                       'category':'',
                       'times_right':'',
                       'times_wrong':''},
        reviews: [],
        history: []
    },
    reducers: {
        next(state, action) {
            // get the result of the next click
            let { result } = action.payload;

            //Keep track of history
            if(state.history.length === 0) {
                // No history yet
                const his = { 'cardid': state.currentCard.cardid, 'nailed':0, 'whiffed':0 };
                his[result] = his[result] + 1;
                state.history.push(his);
            } else {
                // See if you arleady have a history for this card.
                let historyContainsItem= false;
                state.history.forEach( (part, i, theArray) => {
                    if(theArray[i].cardid === state.currentCard.cardid) { 
                        historyContainsItem = true;
                        theArray[i][result]+=1;
                    }  
                   
                });
                // If not add it in there.
                if(historyContainsItem === false) {
                    const his_02 = { 'cardid': state.currentCard.cardid, 'nailed':0, 'whiffed':0 };
                    his_02[result] = his_02[result] + 1;
                    state.history.push(his_02);
                }
            }
            //-----------------------------------------
            // Increase index
             // if index is now more than cards length, go back to zero
            // TODO And also get the next page of cards.
            // if you go over the number of cards, go back to zero
            state.index += 1;
            if( state.index >= state.cards.length ) { 
                state.index = 0; 
            }
            // If they are starting out from the welcome messege start them on card one, then return;
            if(state.currentCard.cardid === 'STARTER') { 
                state.currentCard = state.cards[0];
                console.log(`cardslice.next - currentState: ${JSON.stringify(state)}`);
                return;
            }

            //keep track of ratings on cards
            // Validate rating values
            if(result !== 'nailed' && result !== 'whiffed') { throw new Error('Reducer Next: unkonwn rating'); }
            const cardRating = result === 'nailed' ? 'times_right' : 'times_wrong';
            // rate the card
            state.cards.forEach( (part, i, theArray) => { 
                if (theArray[i].cardid === state.currentCard.cardid){ 
                    theArray[i][cardRating]+=1;
                }
            });
            state.currentCard = state.cards[state.index];
            console.log(`cardslice.next - currentState: ${JSON.stringify(state)}`);
        },
        addCard(state, action) { 
            //return Object.assign({}, state, {cards: state.cards.concat(action.card), categoryNames: cats, newCards: state.newCards.concat(action.card)});
            //console.log(`addCard: cardSlice -> card: ${JSON.stringify(action.payload)}`);
            const {card,answer,category,times_right,times_wrong,owner_id} = action.payload;
            const cardid = createTempId();
            state.cards.push({cardid,card,answer,category,times_right,times_wrong,owner_id});
            state.newCards.push({card,answer,category,times_right,times_wrong,owner_id});
            console.log(`cardslice.addCard - currentState: ${JSON.stringify(state)}`);
        },
        fillCategories (state, action) { 
            /* {catid: 0,  count: 0, rating: 0}
            state.cards.forEach((part, index, theArray) => {
                if (!categories.includes(card.category)) {
                categories.push({
                    catid: 0,
                    name: card.category,
                    count: 0,
                    rating: 0
                });
                } else {
                let category = categories.find(cat => cat.name === card.category);
                category.count++;
                }
            });
            return Object.assign({}, state, getCategoriesFromCards(state.cards));*/
        },
        update (state, action) { 
            // Handle the update right here, so you don't have to when saving the database.
            // HAS TO BE DONE ASYNC with THUNK ^^ weekend thing
            //axios.post('/updateCards', {cards:action.updates} );
            const { updCard, updAnswer, updCat } = action.payload;
            state.currentCard.card = updCard;
            state.currentCard.answer = updAnswer;
            state.currentCard.category = updCat;
            console.log(`cardslice.update - current State: ${JSON.stringify(state)}`);
        },
        setCards (state, action) { 
            // Save a users cards when they log in.
            //console.log(`Reducers SET_CARDS cards -> ${action.cards.length}`);
            //return Object.assign({}, state, {cards: action.cards});
            state.cards = action.payload.cards;
        },
        saveForReview (state, action) {
            if(!state.reviews.some((c) => c.cardid === state.currentCard.cardid)){ 
                const revCard = Object.assign({},state.currentCard);
                state.reviews.push(revCard);
                console.log(`cardslice.saveForReview - currentState: ${JSON.stringify(state)}`);
            }
        },
        review (state, action) {
            if(state.reviews.length > 0) { 
                state.currentCard = state.reviews.pop(); 
                console.log(`cardslice.review - currentState: ${JSON.stringify(state)}`);
            }
        }
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createTempId() { 
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P']; // lenght = 16
    const nums = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']; // 16
    let tempID = '';
    for(let i = 0; i<10; i++) {
        if(getRandomInt(2) === 1) { tempID += letters[getRandomInt(16)]; }
        else { tempID += nums[getRandomInt(16)]; }
    }
    console.log('temp Id for card = '+tempID);
    return tempID;
}

export const { next, addCard, fillCategories, update, saveForReview, review} = cardSlice.actions;
export default cardSlice.reducer;