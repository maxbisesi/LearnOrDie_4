import React from 'react';
import Test from '../Test';
import renderer from 'react-test-renderer';
import dao from '../../../DAO';
import config from '../../../config';
import Login from '../../User/Login';
import { Provider } from "react-redux";
import store from "../../../redux/store";

import {cleanup, fireEvent, render, waitFor} from '@testing-library/react';
// import axiosMock from 'axios'



describe('Test the Test Component', () => { 

    beforeAll(()=>{
        console.log('Log in first to test cards.');
        const { debug, container} = render(
            <Provider store={store}>
                <Login />
            </Provider>,
        );
    
        const un = container.getByTitle('username');
        const pw = container.getByTitle('password');
        const sub = container.getByTitle('submit');
        fireEvent.change(un, { target: { value: 'maxbisesi' } })
        fireEvent.change(pw, { target: { value: 'Basketball12' } })
        fireEvent.submit(sub);
        expect(getByText('Profile')).toBeInTheDocument()
    });

    test('It renders correctly', () => {
        const { debug, container} = render(
            <Provider store={store}>
                <Test />
            </Provider>,
        );
        
        const nailed = container

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