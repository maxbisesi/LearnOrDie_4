import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../features/Global/Main';
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingView from './LoadingView';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
            <Main />
        </PersistGate>   
     </Provider>, document.getElementById('root')
);
