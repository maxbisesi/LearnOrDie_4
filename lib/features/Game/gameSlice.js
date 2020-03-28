import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { tiles } from '../../config';


const gameSlice = createSlice({
    name: 'game',
    initialState: { 
        'playerPosition':[0,0],
        'sharkPosition':[0,0],
        'tiles':tiles
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