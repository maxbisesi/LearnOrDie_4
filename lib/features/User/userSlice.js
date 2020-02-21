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

const userSlice = createSlice({
    name: 'user',
    initialState: {  
        rankProgress:{'cardsAdded':0,'categories':0,'badges':0,'cardsUpdated':0,'cardsReview':0,'sharkFins':0},
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
        profile: {} 
    },
    reducers: {
      login(state,action){ 
        // Just to test for now
        console.log(action.payload);
        state.user = {user_id: '0',
                    userName: 'BIG DOG',
                    firstName: 'B.',
                    lastName: 'DOGG',
                    email: 'dont use it',
                    totalPoints: 55,
                    cardCount: 5,
                    rank: 'K9',
                    guest: false};
      },
      setCards(state,action){},
      saveSession(state,action){}
    }
});

export const { login, setCards, saveSession } = userSlice.actions;
export default userSlice.reducer;