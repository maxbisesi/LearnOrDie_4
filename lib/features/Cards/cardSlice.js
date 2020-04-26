import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fail } from 'assert';
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
    name: 'cardSlice',
    initialState: { 
        index: 0,
        cards:[], 
        categories: {},
        newCards: [],     
        currentCard: {'card_id': 'STARTER', 
                        'card':`Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time
                                         it's going to be rough,\nGood Luck! Click either button to get started.`,
                       'answer':'',
                       'category':'',
                       'correct':0, 
                       'incorrect':0,
                        'owner_id':0},
        reviews: [],
        history: [],
        cardSets: {},
        cardCount: 0
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
                return;
            }

            //keep track of ratings on cards
            // Validate rating values
            if(result !== 'nailed' && result !== 'whiffed') { throw new Error('Reducer Next: unkonwn rating'); }
            const cardRating = result === 'nailed' ? 'correct' : 'incorrect';
            // rate the card
            state.cards.forEach( (part, i, theArray) => { 
                if (theArray[i].cardid === state.currentCard.cardid){ 
                    theArray[i][cardRating]+=1;
                }
            });
            state.currentCard = state.cards[state.index];
        },
        addCard(state, action) { 
            const {card_id,card,answer,category,owner_id} = action.payload;

            //This is a new card so it's id is undefined, if the user is not logged in his owner_id will be GUESTID:
            state.cards.push({'cardid':card_id,'card':card,'answer':answer,'category':category,'owner_id':owner_id, 'correct':0, 'incorrect':0});
            //state.newCards.push({'cardid':undefined,'card':card,'answer':answer,'category':category,'owner_id':owner_id, 'correct':0, 'incorrect':0});
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

            // THIS won't work because your just updating the current card object that is dissmissed as
            // soon as the next card comes in, need to find the current card in the cards array and update it there.
            // That is jsut to keep it updated locally perform the update on the db as a thunk. --- >
            const { card_id, newCard, newAnswer, newCat } = action.payload;
            const updCard = state.cards.find(c => c.card_id === card_id);
            updCard.card =  newCard;
            updCard.answer = newAnswer;
            updCard.category = newCat;
        },
        setCards (state, action) { 
            // Save a users cards when they log in.
            //console.log(`Reducers SET_CARDS cards -> ${action.cards.length}`);
            //return Object.assign({}, state, {cards: action.cards});
            state.cards = action.payload;
            state.cardCount = action.payload.length;
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
        },
        fillSets(state,action) {
            state.cardSets = action.payload.cardSets;
        }
    }
});

// Thunks async actions -->
export function insertCard(card) {
    return async (dispatch, getState) => {
        //const user_id = getState().user.user_id;
        const user_id = getState().userSlice.user.user_id;
        console.log(JSON.stringify(getState()));
        if(user_id === 'GUESTID'){
            //If this user is not logged in just add the card
            // Should this unregistered user log in, 
            //then write something that saves their stuff
            dispatch(addCard(card));
            return;
        } else {
            const newCardResponse = await axios.post('/insertCard',{'card':card, 'user_id':user_id});
            if (newCardResponse.status === 200) {
                const newCard = newCardResponse.data.dbCard;
                dispatch(addCard(newCard));
            } else { fail( ' insertCard Thunk: Card did not insert.'); }
        }
    };
 }

 export function asyncUpdateCard(card) {
    return async (dispatch, getState) => {
        // Check the owner id
        const user_id = getState().userSlice.user.user_id;
        console.log(`user slice: ${JSON.stringify(getState().userSlice)}`);
        console.log(`card: ${JSON.stringify(card)}`);
        // Double check user id and owner Id
        if( user_id !== card.owner_id ){ fail( 'User trying to update cards not their own. '); }
        // double check user is logged in
        if ( getState().userSlice.loggedIn === false || user_id === 'GUESTID' ) { fail('Guest user trying to update cards. ');}

        const updateResponse = await axios.post('/updateCard',card);
        console.log(JSON.stringify(updateResponse));
        /*
            {"data":{"card_id":13,"card":"question","category":"Exceptions"},
                "status":200,"statusText":"OK",
                "headers":
                    {
                        "connection":"keep-alive",
                        "content-length":"321",
                        "content-type":"application/json; charset=utf-8",
                        "date":"Sat, 18 Apr 2020 23:00:04 GMT",
                        "etag":"W/\"141-wcumgxItbwf0JmnfQy88UuBGs/c\"",
                        "x-powered-by":"Express"
                    },
                "config":{
                    "url":"/updateCard",
                    "method":"post",
                    "data":"{\"card\":{\"card_id\":13,\"card\":\"",\"answer\":\"\",\"category\":\"Exceptions\",\"owner_id\":1}}",
                        "headers":{"Accept":"application/json, text/plain,",
                        "Content-Type":"application/json;charset=utf-8"},
                        "transformRequest":[null],"transformResponse":[null],
                        "timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN",
                        "maxContentLength":-1
                    },
                "request":{}
            }
        */
        if(updateResponse.status === 200) {
            const updatedCard = updateResponse.data;
            dispatch(update(updatedCard));
        } else { fail(' asyncUpdateCard Thunk: Card did not update in DB.'); }
    };
 }

export const { next, addCard, fillCategories, update, saveForReview, review, setCards, fillSets} = cardSlice.actions;
export default cardSlice.reducer;