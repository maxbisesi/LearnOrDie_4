import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fail } from 'assert';


const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: { 
        playerPosition:[0,0],
        sharkPosition:[0,0]
    },
    reducers: {
        changePlayerPosition(state,action)
    }
});

export const { } = gameSlice.actions;
export default gameSlice.reducer;