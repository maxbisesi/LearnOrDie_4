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
    name: 'test',
    initialState: { 
        index: 0,
        cards:[], 
        newCards: [],     
        currentCard:  {cardid: 'STARTERCARD', 
                        card:"Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time it's going to be rough,\nGood Luck! Click either button to get started.", 
                        answer: "", 
                        category: "",
                        times_right:0,
                        times_wrong:0,
                        owner_id:0,
                        fk_user_id:0
        },
        reviews: [],
        history: [],
    },
    reducers: {
        next(state, action) {
            // get the result of the next click
            let result = action.payload.result;
            // If the user is just getting started, exit them from the starter card gracefully
            if( result === 'GETSTARTED' ) {
                state.currentCard = state.cards[0];
                //return Object.assign({},state,{index: 0, currentCard: state.cards[0]});
            }

            //Keep track of history
            let newHistory;
            if(state.history.length === 0) {
                // No history yet
                const his = { 'cardid': state.currentCard.cardid, 'nailed':0, 'whiffed':0 };
                his[result] = his[result] + 1;
                state.history.push(his);
            } else {
                // See if you arleady have a history for this card.
                let historyContainsItem = false;
                newHistory = state.history.map((item) => {
                    if(item.cardid !== state.currentCard.cardid) { return item;}  
                    else { 
                        historyContainsItem = true;
                        let res = item[result];
                        res += 1;
                        return Object.assign( {},item, { [result]:res } ); 
                    }
                });
                // If not add it in there.
                if(historyContainsItem === false) {
                    const his_02 = { 'cardid': state.currentCard.cardid, 'nailed':0, 'whiffed':0 };
                    his_02[result] = his_02[result] + 1;
                    newHistory.push(his_02);
                }
            }
            // copy index and increase it
            let newIndex = state.index;
            newIndex+=1;
            //keep track of ratings on cards
            if(result !== 'nailed' && result !== 'whiffed') { throw new Error('Reducer Next: unkonwn rating'); }
            const cardRating = result === 'nailed' ? 'times_right' : 'times_wrong';
            let newCards = state.cards.map( (item) => { 
                if (item.cardid !== state.currentCard.cardid){ return item; }
                else { 
                    let res = item[cardRating];
                    res += 1;
                    return Object.assign( {},item, { [cardRating]:res } ); 
                }
            });
            // if index is now more than cards length, go back to zero
            // TODO And also get the next page of cards.
            if( newIndex >= newCards.length ) { 
                newIndex = 0; 
            }
            // pass the result to selector to obtain new session object
            let newSesh = getSession(result,state.session);
            // Change the state based on these new values
            return Object.assign({},state,{index: newIndex, currentCard: newCards[newIndex], session: newSesh, cards: newCards, history: newHistory });
        },

    },
    addCard(state, action) { 
        //return Object.assign({}, state, {cards: state.cards.concat(action.card), categoryNames: cats, newCards: state.newCards.concat(action.card)});
        state.cards.push(action.payload.card);
        //state.categoryNames.push(
    },
    fillCategories(state, action) { 
        /* {catid: 0,  count: 0, rating: 0}
        state.cards.forEach(card => {
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
    update() { }
});

export const {  } = cardSlice.actions;
export default cardSlice.reducers;