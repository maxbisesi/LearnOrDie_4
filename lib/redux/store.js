import cardSlice from '../features/Cards/cardSlice';
import testSlice from '../features/Test/testSlice';
import userSlice from '../features/User/userSlice';
import avatarSlice from '../features/User/avatarSlice';
import gameSlice from '../features/Game/gameSlice';
import storage from 'redux-persist/lib/storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { logger } from './reduxMiddleware';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { REHYDRATE } from 'redux-persist';

// Persistance 
const persistConfig = {
    key: 'root',
    blacklist: [],
    whitelist: ['cardSlice','testSlice','userSlice','gameSlice'],
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

function rehydrateFinished() { console.log('rehy callback');}

// Thunk Middleware: if an action dispatched to the store is a function() then treat it as thunk
// return action(dispatch, getState, extraArgument);
// removed ...getDefaultMiddleware()
const rootReducer = combineReducers({cardSlice,testSlice,userSlice,avatarSlice,gameSlice});
const pReducer = persistReducer(persistConfig,rootReducer);
export const store = configureStore({'reducer':pReducer, 'middleware': [thunkMiddleware, logger], 'preloadedState':undefined});
export const persistor = persistStore(store,{'manualPersist': true},rehydrateFinished);