import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const gameSlice = createSlice({
    name: 'game',
    initialState: { 
        playerPosition:[0,0],
        sharkPosition:[0,0]
    },
    reducers: {
        changePlayerPosition(state,action) {
            console.log(`changePlayerPosition: ${action.payload.playerPosition}`)
            state.playerPosition = action.payload.playerPosition;
        }
    }
});

export const { changePlayerPosition } = gameSlice.actions;
export default gameSlice.reducer;