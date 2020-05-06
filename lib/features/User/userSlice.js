import { createSlice } from "@reduxjs/toolkit";
import { checkRankUp } from '../../Utils';
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
  name: "userSlice",
  initialState: {
    loggedIn: false,
    user: {
      user_id: "GUESTID",
      username: "guest_user",
      email: "guestEmail",
      points: 0,
      userrank: "Guest"
    },
    //Don't show more than the last 30 session
    session: { cards_seen:0, correct:0, incorrect:0, cards_added:0, points_added:0, card_sets_added:0, 'user_id':0}
  },
  reducers: {
    login(state, action) {
      //state.user = payload;
      // password is not stored...
      // Rank will be undefined when logging in as existing user
      // but will already by set for new user.
      // so use a Selector to calculate an existinng users rank.
      // On the otherside of this make sure when they log out or unload that their points
      // are saved. 
      // still haven't implemented badges yet either
      state.user.user_id = action.payload.user_id;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.points = action.payload.points;
      state.user.userrank = action.payload.userrank;
      // Set Id up to save session when done.
      state.session.user_id = action.payload.user_id;
      state.loggedIn = true;
    },
    setSessions(state, action) {
      state.sessions = action.payload.sessions;
    },
    rankup(state, action) {
      state.user.userrank = action.payload.userrank;
    }
  }
});
// async thunks
//export const login =

export const { login, rankup, setSessions } = userSlice.actions;
export default userSlice.reducer;
