import React from 'react';
import Test from '../Test';
import renderer from 'react-test-renderer';
import dao from '../../../DAO';
import config from '../../../config';
import Main from '../../Global/Main';
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { act } from 'react-dom/test-utils';
//import {cleanup, fireEvent, render, waitFor, screen} from '@testing-library/react';
// import axiosMock from 'axios'
import ReactDOM from 'react-dom';



describe('Test the Test Component', () => { 
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    test('It renders correctly', () => {
        act(() => {
            ReactDOM.render(            
            <Provider store={store}>
                <Main />
            </Provider>, container);
        });

        const tabs = container.querySelector("div.react-tabs");
        expect(tabs.children).toHaveLength(5);
    });

    test('Nailed card.', () => {
        //const tree = 
    });

    test('Whiffed card.', () => {

    });

    test('Show card.', () => {

    });

    test('Review card.', () => {

    });

    test('Update card.', () => {

    });
});