import { createSlice } from "@reduxjs/toolkit";
import Utils from '../../Utils';
import axios from 'axios';

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
      userrank: "Guest",
      token: "GUEST"
    },
    //Don't show more than the last 30 session
    session: { cards_seen:0, correct:0, incorrect:0, cards_added:0, points_added:0, card_sets_added:0, 'user_id':0},
    modules: {
      // Every module has to have an Id, active, and name property
      mathmodule: {'id':'mathmod','active':false, 'name':'Math Module'},
      chatmodule: {'id':'chatmod','active':false, 'name':'Chat Module'}
    },
    tabs: {
      drawtab: {'id':'drawtab','active':false,'name':'Draw Tab'}
    }
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
      state.user.token = action.payload.token;
      // Set Id up to save session when done.
      state.session.user_id = action.payload.user_id;
      state.loggedIn = true;
    },
    setSessions(state, action) {
      state.sessions = action.payload.sessions;
    },
    rankup(state, action) {
      state.user.userrank = action.payload.userrank;
    },
    toggleMathModule(state) {
      state.modules.mathmodule.active = !state.modules.mathmodule.active;
    },
    toggleChatModule(state) {
      state.modules.chatmodule.active = !state.modules.chatmodule.active;
    },
    toggleDrawTab(state) {
      state.tabs.drawtab.active = !state.tabs.drawtab.active;
    }
  }
});

// async thunks
export function logout() {
  return async (dispatch, getState) => {
      const user = getState().userSlice.user;
      const loggedin = getState().userSlice.loggedIn;
      if ( loggedin === false || user.user_id === 'GUESTID' ) {
        // do nothing
      } else { 
        const cardsAdded = getState().cardSlice.cardsAdded;
        const sesh = getState().testSlice.session;
        const cardSetsAdded = getState().cardSlice.cardSetsAdded;
        const userSesh =  { 'correct': sesh.nailed,'incorrect': sesh.whiffed,'cards_added': cardsAdded,'points_added': sesh.points,'card_sets_added': cardSetsAdded,'user_id': user.user_id };
        const saveSessionResp = await axios.post('/saveSession',{'session':userSesh,'user':user}); 
        if(saveSessionResp.status === 200) { 
          // Reset to initial state
          dispatch({ 'type':'USER_LOGOUT'}); 
        }

      }
  };    
}

export const { login, rankup, setSessions, toggleMathModule, toggleChatModule, toggleDrawTab } = userSlice.actions;
export default userSlice.reducer;
