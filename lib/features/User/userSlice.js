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
      loginAction(state,action){},
      setCards(state,action){},
      saveSession(state,action){}
    }
});

export const { loginAction, setCards, saveSession } = userSlice.actions;
export default userSlice.reducer;