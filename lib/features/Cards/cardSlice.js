import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fail } from 'assert';
import logger from '../../Logger';
import { tempId } from '../../Utils';
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
        currentCard: {'card_id': 'STARTER', 
                        'card':`Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time
                                         it's going to be rough,\nGood Luck! Click either button to get started.`,
                       'answer':'',
                       'category':'',
                        'owner_id':0},
        reviews: [],
        history: [],
        cardSets: {},
        cardCount: 0,
        randomizeQuestionsFlag: true,
        filteredCards: [],
        filterOn: false
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
            //-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
            // Increase index
             // if index is now more than cards length, go back to zero
            // TODO And also get the next page of cards.
            // if you go over the number of cards, go back to zero
            // If they are starting out from the welcome messege start them on card one, then return;
            if(state.currentCard.cardid === 'STARTER') { 
                state.currentCard = state.cards[0];
                return;
            }
            if(state.randomizeQuestionsFlag === true) {
                let m = state.cards.length;
                let rando = Math.floor(Math.random() * m);
                state.index = rando;
            } else {
                state.index += 1;
                if( state.index >= state.cards.length ) { 
                    state.index = 0; 
                }
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
            if(state.filterOn === true) { 
                //state.currenC
            } else {
                state.currentCard = state.cards[state.index];
            }
        },
        addCard(state, action) { 
            const {card_id,card,answer,category,owner_id} = action.payload;
            let id;
            //This is a new card so it's id is GUESTCARD, if the user is not logged in his owner_id will be GUESTID:
            if(card_id === 'GUESTCARD') { 
                id = tempId(); 
            } else {
                id = card_id;
            }
            state.cards.push({'card_id':id,'card':card,'answer':answer,'category':category,'owner_id':owner_id, 'correct':0, 'incorrect':0});
            state.cardCount += 1;
            if(state.categories.hasOwnProperty(category)) {
                state.categories[category]++;
            }else {
                state.categories[card.category] = 1;
            }
        },
        fillCategories (state, action) { 
            state.cards.forEach((card,ind) => {
                if(state.categories.hasOwnProperty(card.category)) {
                    state.categories[card.category]++;
                }else {
                    state.categories[card.category] = 1;
                }
            });
        },
        update (state, action) { 
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
            state.cards = action.payload;
            state.cardCount = action.payload.length;
        },
        pushCards(state, action) {
            const pushcards = action.payload;
            state.cards = state.cards.concat(pushcards);
        },
        saveForReview (state, action) {
            const revCard = Object.assign({},state.currentCard);
            state.reviews.push(revCard);
        },
        review (state, action) {
            if(state.reviews.length > 0) { 
                state.currentCard = state.reviews.pop(); 
            }
        },
        fillSets(state,action) {
            state.cardSets = action.payload.cardSets;
        },
        filter(state,action) {
            state.filterOn = true;
            const cats = action.payload.cats;
            const filteredCard = 
        }
    }
});

// Thunks async actions -->
export function insertCard(card) {
    return async (dispatch, getState) => {
        const user_id = getState().userSlice.user.user_id;
        if(user_id === 'GUESTID'){
            //If this user is not logged in just add the card locally
            dispatch(addCard(card));
            return;
        } else {
            const response = await axios.post('/insertCard',{'card':card, 'user_id':user_id});
            if (response.status === 200) {
                const newCard = response.data;
                dispatch(addCard(newCard));
            } else { fail( ' insertCard Thunk: Card did not insert.'); }
        }
    };
 }

 export function saveLocalCards(others = undefined) { 
    return async (dispatch, getState) => { 
        const localCards = getState().cardSlice.cards;
        // User id will be created during registration process 
        const user_id = getState().userSlice.user.user_id;
        // If an actual user was created and they have some cards locally
        if(localCards.length > 0 && user_id !== 'GUESTID'){
            const response = await axios.post('/insertCardList',{'cards':localCards, 'user_id':user_id});
            // Update cards in store now
            if(response.data.cards.length === localCards.length) {
                if(others !== undefined && Array.isArray(others)) {
                    dispatch(setCards(response.data.cards.concat(others)));
                } else {
                    dispatch(setCards(response.data.cards));
                }
                dispatch(fillCategories());
            } else { fail(' saveLocalCards Thunk: some cards werent inserted. '); }
        } else if(others !== undefined && user_id !== 'GUESTID' && localCards.length === 0) {
            // If a returning user is logging in with no local cards just save their cards from the db
            dispatch(setCards(others));
            dispatch(fillCategories());
        } else {
            console.log('cardSlice: saveLocalCards -> no local cards');
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

export const { next, addCard, fillCategories, update, saveForReview, review, setCards, fillSets, pushCards, filter} = cardSlice.actions;
export default cardSlice.reducer;