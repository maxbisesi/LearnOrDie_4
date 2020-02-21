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
        currentCard:  {cardid: 'STARTERCARD', 
                        card:"Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time it's going to be rough,\nGood Luck! Click either button to get started.", 
                        answer: "", 
                        category: "",
                        times_right:0,
                        times_wrong:0,
                        owner_id:0,
                        fk_user_id:0},
        reviews: [],
        history: []
    },
    reducers: {
        next(state, action) {
            // get the result of the next click
            let { result } = action.payload;
            // If the user is just getting started, exit them from the starter card gracefully
            console.log(`card slice next result: ${result}`);
            if( result === 'GETSTARTED' ) {
                state.currentCard = state.cards[0];
                return;
                //return Object.assign({},state,{index: 0, currentCard: state.cards[0]});
            }

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
            state.index += 1;
            if( state.index >= state.cards.length ) { 
                state.index = 0; 
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
            // pass the result to selector to obtain new session object
            //  let newSes h = getSession(result,state.session);
            //return Object.assign({},state,{index: newIndex, currentCard: newCards[newIndex], session: newSesh, cards: newCards, history: newHistory });
        },
        addCard(state, action) { 
            //return Object.assign({}, state, {cards: state.cards.concat(action.card), categoryNames: cats, newCards: state.newCards.concat(action.card)});
            //console.log(`addCard: cardSlice -> card: ${JSON.stringify(action.payload)}`);
            const {card,answer,category,times_right,times_wrong,owner_id} = action.payload;
            state.cards.push({card,answer,category,times_right,times_wrong,owner_id});
            state.newCards.push({card,answer,category,times_right,times_wrong,owner_id});
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
            // return Object.assign({}, state, {cards: updateCards(state.cards,action.updates)});
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
            }
        },
        review (state, action) {
            if(state.reviews.length > 0) { 
                state.currentCard = state.reviews.pop(); 
            }
        }
    }
});

export const { next, addCard, fillCategories, update, setCards, saveForReview, review} = cardSlice.actions;
export default cardSlice.reducer;