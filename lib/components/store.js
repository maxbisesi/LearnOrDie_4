import fcs from '../reducers';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({ 
    reducer: fcs 
});