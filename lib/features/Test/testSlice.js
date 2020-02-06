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
    initialState: { session: {points: 0, streak: 0, rut: 0, streakClass:'', nailed:0, whiffed:0},  },
    reducers: {
        next(State, action) {}
    }
});

export const {  } = testSlice.actions;
export default testSlice.reducer;