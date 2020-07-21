import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../features/Global/Main';
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingView from './LoadingView';

function renderCallback() {
    setTimeout( async () => {
        // await persistor.purge();
        await persistor.persist();
        console.log('State persisted ...');
    }, 1000);
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
            <Main purge={persistor.purge} />
        </PersistGate>   
     </Provider>, document.getElementById('root'), renderCallback
);
