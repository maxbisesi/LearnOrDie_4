import React from 'react';
import ReactDOM from 'react-dom';
import Main_FUNC from '../features/Global/Main_FUNC';
import { Provider } from "react-redux";
import store from "../redux/store";

ReactDOM.render(
    <Provider store={store}>
        <Main_FUNC /> 
     </Provider>, document.getElementById('root')
);
