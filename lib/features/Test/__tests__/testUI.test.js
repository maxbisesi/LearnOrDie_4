import React from 'react';
import Test from '../Test';
import renderer from 'react-test-renderer';
import dao from '../../../DAO';
import config from '../../../config';
import Main from '../../Global/Main';
import Login from '../../User/Login';
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { act, Simulate, unmountComponentAtNode, TestUtils, findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
// import axiosMock from 'axios'
import {render, fireEvent, screen} from '@testing-library/react'
import ReactDOM from 'react-dom';



describe('Test the Test Component', () => { 
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(            
            <Provider store={store}>
                <Main />
            </Provider>, container);
        });
    });
    
    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    test('It renders correctly', () => {
        //const tablist = findRenderedDOMComponentWithClass(container,'react-tabs__tab-list');
        //console.log(tablist);
        //expect(TestUtils.isDOMComponent(tablist)).toBe(true);
        const tabs = document.querySelector("div.react-tabs");
        expect(tabs.children).toHaveLength(5);
        const tablist = document.querySelector("ul.react-tabs__tab-list");
        expect(tablist.children).toHaveLength(4);
    });

    test('Login.', () => {
        console.log('Click Login Tab');
        const tabs = document.querySelectorAll('ul.react-tabs__tab-list li');
        const loginTab = tabs[3];
        act(() => {
            loginTab.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        const username = document.querySelector('input[name="user"]');
        act(() => {
            username.dispatchEvent(new Event('change', {bubbles: true, target:{ value:'maxbisesi'}}));
        });
        const pass = document.querySelector('input[name="pass"]');
        act(() => {
            pass.dispatchEvent(new Event('change', {bubbles: true, target:{ value:'Basketball12'}}));
        });
        const loginButton = document.querySelector('.login-loginbutton');
        act(() => {
            loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        console.log(screen);
        screen.debug();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

});