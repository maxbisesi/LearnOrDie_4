import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { tiles } from '../../config';


const gameSlice = createSlice({
    name: 'game',
    initialState: { 
        'playerPosition':[0,0],
        'sharkPosition':[0,0],
        'tiles':tiles,
        'spriteLocation': '0px 0px',
        'direction': 'east',
        'walkIndex':0
    },
    reducers: {
        changePlayerPosition(state,action) {
            state.direction = action.payload.direction;
            state.spriteLocation = action.payload.spriteLocation;
            state.walkIndex = action.payload.walkIndex;
            state.playerPosition = action.payload.playerPosition;
        }
    }
});

export const { changePlayerPosition } = gameSlice.actions;
export default gameSlice.reducer;