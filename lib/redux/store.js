import cardReducer from 'features/Cards/cardsSlice';
import testReducer from 'features/Test/testSlice';
import homeReducer from 'features/User/Home/Home';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer:{cardReducer, testReducer, homeReducer} });

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

export const AppDispatch = store.dispatch;
export default store;