import chumReducer from 'features/Chum/chumSlice';
import testReducer from 'features/Test/testSlice';
import { configureStore } from '@reduxjs/toolkit';


export default configureStore({ 
    chum: chumReducer,
    home: homeReducer,
    test: testReducer,
});