import cardSlice from 'features/Cards/cardSlice';
import testSlice from 'features/Test/testSlice';
import userSlice from 'features/User/userSlice';
import avatarSlice from 'features/User/avatarSlice';
import gameSlice from 'features/Game/gameSlice';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { logger } from './middleware';
import thunkMiddleware from 'redux-thunk';

// Thunk Middleware: if an action dispatched to the store is a function() then treat it as thunk
// return action(dispatch, getState, extraArgument);
const rootReducer = combineReducers({cardSlice,testSlice,userSlice,avatarSlice,gameSlice});
const store = configureStore({reducer:rootReducer, middleware: [...getDefaultMiddleware(), thunkMiddleware, logger]});

export default store;