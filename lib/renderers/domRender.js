import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import Login from 'components/Login';
import { Provider } from "react-redux";
import store from "../components/store";

ReactDOM.render(
    <Provider store={store}>
        <Main /> 
     </Provider>, document.getElementById('root')
);
