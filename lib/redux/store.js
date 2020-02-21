import cardSlice from 'features/Cards/cardSlice';
import testSlice from 'features/Test/testSlice';
import userSlice from 'features/User/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({cardSlice,testSlice,userSlice});
const store = configureStore({reducer:rootReducer});

export default store;