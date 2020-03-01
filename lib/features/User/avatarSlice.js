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

const avatarSlice = createSlice({
    name: 'avatar',
    initialState: { 
        characters: [],
        primaryWeapons: ['Ghaff','Anchor and Chain','Hook hand','Cannon','Axe','Harpoon gun'],
        secondWeapons: ['Parrot','Club','Net'],
        birthStars: ['Southern Moon','Black Sun','The Virgin','Golden Eyed Skull'],
        charStyles: ['Rogue','Princely','Theive in the Night'],
        lockedCharacters: [],
        lockedPrimaryWeapons: [],
        lockedSecondWeapons: [],
        lockedBirthStars: [],
        bosses: []
    },
    reducers: {
      
     
    }
});

//export const {  } = avatarSlice.actions;
export default avatarSlice.reducer;