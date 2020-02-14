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

const testSlice = createSlice({
    name: 'test',
    initialState: { 
      session: {points: 0, streak: 0, rut: 0, streakClass:'', nailed:0, whiffed:0},
      reviews: []
    },
    reducers: {
      saveForReview(state, action) {
        //return Object.assign({}, state, {reviews: state.reviews.concat(state.currentCard.cardid)});
        state.reviews.push(action.payload.cardid);
      } 
    },
    extraReducers: {
      next(state, action) { 
        // Update history
        const res = action.payload.result;
        if (res === 'nailed') {
          let currentStreak = ++state.session.streak;
          state.session.rut = 0;
          ++state.sesssion.nailed;
      
          if (currentStreak < 5 && currentStreak > 0) {
            state.session.points += 1;
            state.session.streakClass = 'onStreak1';
          } else if (currentStreak >= 5 && currentStreak < 10) {
            state.session.points += 10;
            state.session.streakClass = 'onStreak2';
          } else if (currentStreak > 10 && currentStreak < 30) {
            state.session.points += 20;
            state.session.streakClass = 'onStreak3';
          } else if (currentStreak >= 30) {
            state.session.points += 50;
            state.session.streakClass = 'onStreak4';
          }

        } else if (res === 'whiffed') {
          let currentRut = ++state.session.rut;
          state.session.streak = 0;
          ++state.session.whiffed;
      
          if (currentRut <= 5 && currentRut > 0) {
            state.session.points -= 10;
          } else if (currentRut > 5 && currentRut < 10) {
            state.session.points -= 20;
          } else if (currentRut > 10 && currentRut < 15) {
            state.session.points -= 50;
          } else if (currentRut >= 15) {
            state.session.points -= 150;
          }
          state.session.streakClass = 'pointsNormal';
          return state.session;
        } else { throw new Error('--- Points: updateSession: unkown result. ---'); } 
      }
    }
});

export const { saveForReview } = testSlice.actions;
export default testSlice.reducer;