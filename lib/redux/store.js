import cardsSlice from 'features/Cards/cardsSlice';
import testSlice from 'features/Test/testSlice';
import userSlice from 'features/User/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({cardsSlice,testSlice,userSlice});
const store = configureStore({reducer:rootReducer});

/*
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}
export type AppDispatch = typeof store.dispatch
export default store
*/

//export const AppDispatch = store.dispatch;
export default store;