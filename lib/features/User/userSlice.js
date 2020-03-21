import { createSlice } from "@reduxjs/toolkit";

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
  name: "user",
  initialState: {
    loggedIn: false,
    user: {
      user_id: "0",
      username: "guest_user",
      email: "guestEmail",
      points: 0,
      rank: "Guest",
      guest: true,
      firstTimeUser: true
    },
    profile: {},
    //Don't show more than the last 30 session
    sessions: []
  },
  reducers: {
    login(state, action) {
      // Just to test for now
      //  let { result } = action.payload;
      const loggedInUser = action.payload.user;
      //state.user = loggedInUser;
      state.user.user_id = loggedInUser.user_id;
      state.user.username = loggedInUser.username;
      state.user.email = loggedInUser.email;
      state.user.points = loggedInUser.points;
      state.loggedIn = true;
      state.user.firstTimeUser = loggedInUser.firstTimeUser;
    },
    setSessions(state, action) {
      state.sessions = action.payload.sessions;
    },
    rankup(state, action) {
      const { newRank } = action.payload;
      state.user.rank = newRank;
    }
  }
});

// async thunks
//export const login =

export const { login, rankup, setSessions } = userSlice.actions;
export default userSlice.reducer;
