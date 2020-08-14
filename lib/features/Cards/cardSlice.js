import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fail } from 'assert';
import logger from '../../Logger';
import { tempId, binarySearch, binarySearchForCardId } from '../../Utils';
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
        collections: {},
        currentCard: {'card_id': 'STARTER', 
                        'card':`Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time
                                         it's going to be rough,\nGood Luck! Click either button to get started.`,
                        'answer':'',
                        'category':'',
                        'owner_id':0,
                        'collection':'',
                        'image':null},
        reviews: [],
        history: [],
        cardSets: [],
        cardSetsAdded: 0,
        cardCount: 0,
        filterIndex: 0,
        filterCardIDs: [],
        cardsAdded: 0,
        studySetIds: [],
        studySetCardIds: [],
        studySetIndex: 0,
        sequencingMode: 'random'
    },
    reducers: {
        next(state, action) {
            // get the result of the next click
            let { result } = action.payload;

            //Keep track of history
            // Skip for previous card
            if(result !== 'previous') {
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
            }
            //-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
            // Increase index
             // if index is now more than cards length, go back to zero
            // TODO And also get the next page of cards.
            // if you go over the number of cards, go back to zero
            // If they are starting out from the welcome messege start them on card one, then return;
            if(state.currentCard.cardid === 'STARTER') { 
                state.currentCard = state.filterOn ? state.filteredCards[0] : state.cards[0];
                return;
            }

            //keep track of ratings on cards
            // Validate rating values
            if(result === 'nailed' || result === 'whiffed') {
                // These steps are only going forward see else for 'previous'
                const cardRating = result === 'nailed' ? 'correct' : 'incorrect';
                // rate the card
                // Only rate card if going forward
                state.cards.forEach( (part, i, theArray) => { 
                    if (theArray[i].cardid === state.currentCard.cardid){ 
                        theArray[i][cardRating]+=1;
                    }
                });

                // There's three modes:
                // 1. Regular study, randomized or none
                // 2. Filtered study, no randomization
                // 3. Set study, no radnomization 
                switch(state.sequencingMode) {
                    case 'sequence': 
                        state.index += 1;
                        if(state.index >= state.cards.length) {
                            state.index = 0;
                        }
                        state.currentCard = state.cards[state.index];
                        break;
                    case `random`: 
                        let m = state.cards.length;
                        let rando = Math.floor(Math.random() * m);
                        state.index = rando;
                        state.currentCard = state.cards[state.index];
                        break;
                    case `filter`: 
                        // get the next filtered card ID
                        const filtId = state.filterCardIDs[state.filterIndex];
                        // find next card Id with binary search, set the current card
                        state.cards.sort((a,b) => a.card_id - b.card_id);
                        let nextFilteredCardIndex = binarySearchForCardId(state.cards,filtId);
                        state.currentCard = state.cards[nextFilteredCardIndex];
                        state.filterIndex += 1;
                        if(state.filterIndex == state.filterCardIDs.length){
                            state.filterIndex = 0;
                        }
                        break;
                    case `set`: 
                        let nextSetCardId = state.studySetCardIds[state.studySetIndex];
                        // TODO randomize
                        state.studySetIndex += 1;
                        if(state.studySetIndex == state.studySetCardIds.length) { state.studySetIndex = 0; }
                        // sort the cards by ID before using binarysearch
                        state.cards.sort( (a,b) => a.card_id - b.card_id);
                        let cardIndex = binarySearchForCardId(state.cards,nextSetCardId);
                        state.currentCard = state.cards[cardIndex];
                        break;
                    default: fail('Unknown sequencing mode.');
                }
            } else if( result === 'previous' ) {
                // else previous was given
                switch(state.sequencingMode) {
                    case 'sequence': 
                        state.index -= 1;
                        if( state.index < 0 ) {
                            state.index = 0;
                        }
                        state.currentCard = state.cards[state.index];
                        break;
                    case `random`: 
                        // This will take some effort
                        // Same as moving forward, move forward randomly move back randomly
                        let m = state.cards.length;
                        let rando = Math.floor(Math.random() * m);
                        state.index = rando;
                        state.currentCard = state.cards[state.index];
                        break;
                    case `filter`: 
                        throw new Error('Filter Previous not implemented yet. ');
                    case `set`: 
                        let nextSetCardId = state.studySetCardIds[state.studySetIndex];
                        // TODO randomize
                        state.studySetIndex -= 1;
                        if(state.studySetIndex == state.studySetCardIds.length) { state.studySetIndex = 0; }
                        if(state.studySetIndex < 0) { state.studySetIndex = 0; }
                        // sort the cards by ID before using binarysearch
                        state.cards.sort( (a,b) => a.card_id - b.card_id);
                        let cardIndex = binarySearchForCardId(state.cards,nextSetCardId);
                        state.currentCard = state.cards[cardIndex];
                        break;
                    default: fail('Unknown sequencing mode.');
                }
            } else { throw new Error(`Unknown result: ${result}`); }
        },
        addCard (state, action) { 
            const {card_id,card,answer,category,owner_id, collection, image} = action.payload;
            let id;
            //This is a new card so it's id is GUESTCARD, if the user is not logged in his owner_id will be GUESTID:
            if(card_id === 'GUESTCARD') { 
                id = tempId(); 
            } else {
                id = card_id;
            }
            state.cards.push({'card_id':id,'card':card,'answer':answer,'category':category,'owner_id':owner_id, 'correct':0, 'incorrect':0, 'collection':collection,'image':image});
            // if the question has an image, save it as question picture, related to the cards id
            state.cardCount += 1;
            state.cardsAdded += 1;
            if(state.categories.hasOwnProperty(category)) {
                state.categories[category].push(card_id);
            }else {
                state.categories[category] = [card_id];
            }
        },
        fillCategories (state) { 
            state.categories = {};
            state.cards.forEach( (card) => {
                if(card[`DELETED`] === true) { return; }
                if(state.categories.hasOwnProperty(card.category)) {
                    state.categories[card.category].push(card.card_id);
                }else {
                    state.categories[card.category] = [card.card_id];
                }
            });
        },
        update (state, action) { 
            const { card_id, newCard, newAnswer, newCat } = action.payload;
            const ind = state.cards.findIndex(c => c.card_id === card_id);
            state.cards[ind].card = newCard; 
            state.cards[ind].answer = newAnswer;
            state.cards[ind].category = newCat;
            console.log(`new card in store: ${state.cards[ind]}`);
        },
        setCards (state, action) { 
            // Save a users cards when they log in.
            // Sort cards by id before saving them
            // also create collections
            let cardsSORT = action.payload;
            cardsSORT.sort((a,b) => {
                return a.card_id - b.card_id;
            });
            state.cards = cardsSORT;
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
            state.cardSets = action.payload;
        },
        filter(state,action) {
            state.filterOn = true;
            state.sequencingMode = 'filter';
            state.studySetIds = [];
            state.filterCardIDs = [];        
            state.index = 0;
            state.filterIndex = 0;
            // Removed filter:
            if(action.payload === 'Remove') {
                state.filterOn = false;
                state.filterCardIDs = [];
                state.sequencingMode = 'random';
                return;
            }

            const cats = action.payload.categories;
            const colls = action.payload.collections;
            console.log(`filter reducer: ${cats} ${colls}`);
            let ids = [];
            if(cats.length > 0) {
                cats.forEach( (cat) => {
                    let categs = state.categories[cat];
                    ids.push(...categs);
                });
            }
            
            if(colls.length > 0) {
                colls.forEach( (col) => {
                    let categ_Ids = Object.entries(state.collections[col]);
                    // categ_Ids = [['Catename',[...ids]],[],[]]
                    for(let x =0; x < categ_Ids.length; x++) {
                        ids.push(...categ_Ids[x][1]);
                    }
                });
            }
            console.log(`filter reducer ids: ${ids}`);
            state.filterCardIDs = ids;
        },
        addSet(state,action) {
            state.cardSetsAdded += 1;
            state.cardSets.push(action.payload.cardset);
        },
        studySet(state,action) { 
            // receives the card set ID from the Galley,
            // then stores all that set's card ids in the state, 
            // when the user goes to the next card we'll pull from those card_ids
            let id = action.payload;
            state.sequencingMode = 'set';
            if( !state.studySetIds.includes(id) ) { state.studySetIds.push(id); }
            // Get card IDs from set
            const cardset = state.cardSets.find( set => set.set_id == id );
            cardset.cards.forEach( (c) => {
                state.studySetCardIds.push(c);
            });
        },
        deleteCards(state,action) {
            action.payload.forEach( (delid) =>{
                let cardIndex = binarySearchForCardId(state.cards,delid);
                state.cards[cardIndex]['DELETED'] = true;
            });
        },
        renameCategory(state,action) {
            let old = action.payload.oldCat;
            let newCat = action.payload.newCat;
            state.cards.forEach( (card) => {
                if(card.category === old) { 
                    card.category = newCat; 
                }
            });
        },
        newCollection(state,action) {
            const collName = action.payload.name;
            if(state.collections.hasOwnProperty(collName)) {
                // do nothing
            } else {
                state.collections[collName] = {};
            }
        },
        addCategoryToCollection(state,action) {
            const collection = action.payload.collection;
            const category = action.payload.category;
            const newCategory = {};
            newCategory[category] = state.categories[category];
            state.collections[collection] = Object.assign(state.collections[collection],newCategory);
            delete state.categories[category];
        },
        removeCategoryFromCollection(state,action) {
            // Remove category from collection, put it back in collecitons
            // collections { 'collection': { 'category':[], 'category':[] }, 'collection2': { 'category3':[], 'category4':[] }  }
            const collection = action.payload.collection;
            const category = action.payload.category;
            //state.collections[collection] = Object.assign(state.collections[collection],newCategory);
            state.categories[category] = state.collections[collection][category];
            delete state.collections[collection][category];
        },
        fillCollections(state) {
            // Get all the cards that belong to a collection
            // Collections are an organization that exists above categories.
            state.collections = {};
            const collectionCards = state.cards.filter( (card) => { 
                return (card.collection !== null && card.collection !== undefined && card.collection !== 'none');
            });
            console.log('collection cards length = '+collectionCards.length);
            // for each of those cards with a collection:
            // get the cards category then 
            // copy it's entry from state.categories, and put it into the collection
            // remove that entry from cateogires.
            // If you come to another card with in a collection and category just move on
            collectionCards.forEach( (card) => {
                const collection = card.collection;
                const category = card.category;
                if(state.collections.hasOwnProperty(collection)){
                    // Collection already exists, see if category exists too
                    if(state.collections[collection].hasOwnProperty(category)) {
                        // Collection and category this card belongs to exists already
                        // so do nothing.
                        // but what if the cat is in another collection ?
                        // console.log(` category: ${category} exists already in collection: ${collection}. Number of cards: ${state.collections[collection][category].length}`);
                    } else {
                        // Collection exists, but category does not so ..
                        // copy over the categories entry into this collection
                        // Now this collection has an entry for the category that has all the 
                        // card ids belonging to it.
                        // Then Delete that entry from categories
                        const newCategory = {};
                        newCategory[category] = state.categories[category];
                        state.collections[collection] = Object.assign(state.collections[collection],newCategory);
                        // console.log(`Adding ${category} to collection ${collection}. Deleting: ${category} from categories.`);
                        delete state.categories[category];
                    }
                } else {
                    // Collection does not exist, create it.
                    const newCategory = {};
                    newCategory[category] = state.categories[category];
                    state.collections[collection] = Object.assign({},newCategory);
                    console.log(` category: ${category} does not exist in ${collection}. Deleting ${category}.`);
                    delete state.categories[category];
                } 
            });
        },
        filterByCollections(state,action) {
            state.sequencingMode = 'filter';
            // Remove Sets when filtering
            state.studySetIds = [];
            //--------------------------
            const collections = action.payload;
            state.index = 0;
            state.cards.forEach((card) => {
                if(collections.includes(card.collection)) { state.filteredCards.push(card); }
            });
        }
    }
});

// Thunks async actions -->
export function insertCard(card) {
    return async (dispatch, getState) => {
        const user = getState().userSlice.user;
        if(user.user_id === 'GUESTID'){
            //If this user is not logged in just add the card locally
            dispatch(addCard(card));
        } else {
            const response = await axios.post('/insertCard',{'card':card,'user':user});
            if (response.status === 200) {
                //console.log(`insertCard response: ${JSON.stringify(response)} `);
                const newCard = response.data;
                dispatch(addCard(newCard));
            } else { fail( 'insertCard Thunk: Card did not insert.'); }
        }
    };
 }

 export function saveLocalCards(others = undefined) { 
    return async (dispatch, getState) => { 
        const localCards = getState().cardSlice.cards;
        // User id will be created during registration process 
        const user= getState().userSlice.user;
        // If an actual user was created, or logged in and they have some cards locally
        if(localCards.length > 0 && user.user_id !== 'GUESTID'){
            const response = await axios.post('/insertCardList',{'cards':localCards, 'user':user});
            // Update cards in store now
            if(response.data.cards.length === localCards.length) {
                if(others !== undefined && Array.isArray(others)) {
                    dispatch(setCards(response.data.cards.concat(others)));
                } else {
                    dispatch(setCards(response.data.cards));
                }
                dispatch(fillCategories());
                dispatch(fillCollections());
            } else { fail(' saveLocalCards Thunk: some cards werent inserted. '); }
        } else if(others !== undefined && user.user_id !== 'GUESTID' && localCards.length === 0) {
            // If a returning user is logging in with no local cards just save their cards from the db
            dispatch(setCards(others));
            dispatch(fillCategories());
            dispatch(fillCollections());
        } else {
            console.log('cardSlice: saveLocalCards -> no local cards');
        }
    };
 }

 export function asyncUpdateCard(card) {
    return async (dispatch, getState) => {
        // Check the owner id
        const user = getState().userSlice.user;
        const user_id = user.user_id;
        // Double check user id and owner Id
        if( user_id !== card.owner_id ){ fail( ' User trying to update cards not their own. '); }
        // double check user is logged in
        // TODO Doesn't seem right, a guest user should still be able to update.
        if ( getState().userSlice.loggedIn === false || user_id === 'GUESTID' ) { fail('Guest user trying to update cards. ');}

        const updateResponse = await axios.post('/updateCard',{'card':card,'user':user});
        console.log(JSON.stringify(updateResponse));
        if(updateResponse.status === 200) {
            const updatedCard = updateResponse.data;
            dispatch(update(updatedCard));
        } else { fail(' asyncUpdateCard Thunk: Card did not update in DB.'); }
    };
 }

 export function createCardSet(setname,desc,ids) {
    return async (dispatch, getState) => { 
        const user = getState().userSlice.user;
        const cardSetResult = await axios.post('/createSet',{'user':user, 'cards':ids, 'setname':setname, 'description':desc});
        // {"data":{"set_id":18,"setname":"EMINEM","description":"GO TO SLEEP BITCH","cards":[10,13,16]}
        dispatch(addSet({'cardset':cardSetResult.data}));
    };
 }

 export function asyncDeleteCards(cards) {
    return async (dispatch, getState) => {
        // Check the owner id
        const user = getState().userSlice.user;
        const user_id = user.user_id;
        // double check user is logged in
        if ( getState().userSlice.loggedIn === false || user_id === 'GUESTID' ) { fail('Guest user trying to update cards. ');}

        const deleteResponse = await axios.post('/deleteCards',{"cardids":cards,"password":'monkeymeat',"user":user});
        // console.log(JSON.stringify(updateResponse));
        if(deleteResponse.status === 200) {
            dispatch(deleteCards(cards));
            dispatch(fillCategories());
        } else { 
            fail(' asyncDeleteCard Thunk: Card did not delete in DB.'); 
        }
    };
 }

 export function asyncRenameCategory(newCat,oldCat) {
    return async (dispatch, getState) => {
        // Check the owner id
        const user = getState().userSlice.user;
        const user_id = user.user_id;
        // double check user is logged in
        console.log(`Rename Category User: ${JSON.stringify(user)}`);
        if ( getState().userSlice.loggedIn === false || user_id === 'GUESTID' ) { fail('Guest can`t change category name.'); }
        const renameResponse = await axios.post('/renameCategory',{'newCat':newCat,'oldCat':oldCat,'user':user});
        if(renameResponse.status === 200) {
            dispatch(renameCategory({newCat,oldCat}));
            dispatch((fillCategories()));
            dispatch(fillCollections());
        } else { 
            fail(' asyncDeleteCard Thunk: Card did not delete in DB.'); 
        }
    };
 }

 export function asyncAddCategoryToCollection(collection,category) {
    return async (dispatch, getState) => {
        const user = getState().userSlice.user;
        const user_id = user.user_id;
        if ( getState().userSlice.loggedIn === false || user_id === 'GUESTID' ) { fail('Guests cant create collecitons.'); }
        const addCatToCollResponse = await axios.post('/addCategoryToCollection',{'collection':collection,'category':category,'user':user});
        if(addCatToCollResponse.status === 200) {
            dispatch(addCategoryToCollection({collection,category}));
        } else if(addCatToCollResponse.status === 201) {
            console.log(`Category wasn't added.`); 
        } else {
            fail('addCategoryToCollection, category not added.');
        }
    }; 
 }

 export function asyncRemoveCategoryFromCollection(collection,category) {
    return async (dispatch, getState) => {
        const user = getState().userSlice.user;
        const user_id = user.user_id;
        if ( getState().userSlice.loggedIn === false || user_id === 'GUESTID' ) { fail('Guests cant remove category from collecitons.'); }
        const removeCatFromCollResponse = await axios.post('/removeCategoryFromCollection',{'collection':collection,'category':category,'user':user});
        if(removeCatFromCollResponse.status === 200) {
            dispatch(removeCategoryFromCollection({collection,category}));
        } else if(removeCatFromCollResponse.status === 201) {
            console.log(`Category wasn't added.`); 
        } else {
            fail('addCategoryToCollection, category not added.');
        }
    }; 
 }

export const { next, addCard, fillCategories, update, saveForReview, review, setCards, fillSets, pushCards, filter, addSet, studySet, deleteCards, renameCategory, newCollection, addCategoryToCollection, fillCollections, filterByCollections, removeCategoryFromCollection} = cardSlice.actions;
export default cardSlice.reducer;