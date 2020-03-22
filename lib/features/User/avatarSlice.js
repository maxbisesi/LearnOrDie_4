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
        // User's Avatar :
        id:'',
        name: '',
        style: '',
        primaryWeapon:'',
        secondary_weapon:'',
        birthstar:'',
        // Other options : 
        availableCharacters:['Fish Wife','Captain','Hammerhead','Barbarosa'],
        availableStyles:['Red','Green','Yellow'],
        availableBirthStars:['The Rougue','Southern Wind','Winter Moon'],
        availableWeapons:['Gaff','Hand Cannon','Saber']
    },
    reducers: {
      initAvatar(state,action) {
        const {avatar_id, style, user_id, birthstar, primary_weapon, secondary_weapon, name } = action.payload.avatar;
        //Do some transformations here if necessary...
        //
        //----------------------------------------------
        state.id = avatar_id;
        state.style = style;
        state.primary_weapon = primary_weapon;
        state.secondary_weapon = secondary_weapon;
        state.birthstar = birthstar;
      },
     
    }
});

export const { initAvatar } = avatarSlice.actions;
export default avatarSlice.reducer;