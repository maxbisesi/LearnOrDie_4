//import { login } from "./actions";
import { getCategoriesFromCards, addToCategory, updateCards, getSession}  from './selectors';
//define the state to include what a guest user is
const initialState = { 
    loggedIn: false,
    user : {
        user_id: '0',
        userName: 'guest_user',
        firstName: 'GUEST',
        lastName: 'GUEST',
        email: 'guestEmail',
        totalPoints: 0,
        cardCount: 0,
        rank: 'GUEST',
        guest: true
    },
    categoryNames: {},
    index: 0,
    cards: [
        {cardid:'id1',answer: 'card1',card:'Giving a node an onclick attribute has a similar effect. This works for most types of events—you can attach a handler through the attribute whose name is the event name with on in front of it.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id2',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id3',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id4',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id5',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id6',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id7',answer: 'card1',card:'2Some primitive machines do handle input like that. A step up from this would be for the hardware or operating system to notice the keypress and put it in a queue. A program can then periodically check the queue for new events and react to what it finds there.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id8',answer: 'card1',card:'Giving a node an onclick attribute has a similar effect. This works for most types of events—you can attach a handler through the attribute whose name is the event name with on in front of it.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id9',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id10',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id11',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id12',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id13',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id14',answer: 'card1',card:'2Some primitive machines do handle input like that. A step up from this would be for the hardware or operating system to notice the keypress and put it in a queue. A program can then periodically check the queue for new events and react to what it finds there.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0}
    ],
    currentCard:  {cardid: 'STARTERCARD', card:"Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time it's going to be rough,\nGood Luck! Click either button to get started.", answer: "", category: "",times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
    session: {points: 0, streak: 0, rut: 0, streakClass:'', nailed:0, whiffed:0},
    history: {total:0, times_right:0, times_wrong:0}
};

export default function fcs(state = initialState, action) { 
    switch(action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {user:action.user, loggedIn: true});
        case 'ADD_CARD':
            const cat = action.card.category;
            const cats = addToCategory(state.categoryNames,cat);
            return Object.assign({}, state, {cards: state.cards.concat(action.card), categoryNames: cats});
        case 'FILL_CATEGORIES':
            return Object.assign({}, state, getCategoriesFromCards(state.cards));
        case 'NEXT': 
            // get the result of the next click
            let result = action.result;
            // If the user is just getting started, exit them from the starter card gracefully
            if( result === 'GETSTARTED' ) {
                return Object.assign({},state,{index: 0, currentCard: state.cards[0]});
            }
            //Keep track of history
            let newHistory = Object.assign({},state.history);
            newHistory[result] += 1;
            newHistory.total += 1;
            // copy index and increase it
            let newIndex = state.index;
            newIndex+=1;
            //keep track of ratings on cards
            if(result !== 'nailed' || result !== 'whiffed') { throw new Error('Reducer Next: unkonwn rating');}
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
            if( newIndex >= newCards.length) { newIndex = 0; }
            // pass the result to selector to obtain new session object
            let newSesh = getSession(result,state.session);
            // Change the state based on these new values
            return Object.assign({},state,{index: newIndex, currentCard: newCards[newIndex], session: newSesh, cards: newCards, history: newHistory });
        case 'SAVE_SESSION':
            return Object.assign({}, state, {session: action.session});
        case 'UPDATE': 
            return Object.assign({}, state, {cards: updateCards(state.cards,action.updates)});
        case 'SET_CARDS':
            //console.log(`Reducers SET_CARDS cards -> ${action.cards.length}`);
            return Object.assign({}, state, {cards: action.cards});
        default: 
            return state;
    }
}

