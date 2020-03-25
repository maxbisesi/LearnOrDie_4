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

    }
});

export const { } = gameSlice.actions;
export default gameSlice.reducer;