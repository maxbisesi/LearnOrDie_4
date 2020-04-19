import React from 'react';
import Test from '../Test';
import renderer from 'react-test-renderer';
import dao from '../../DAO';
import config from '../../config';
import Login from '../../User/Login';

import {cleanup, fireEvent, render, waitFor, screen} from '@testing-library/react';
// import axiosMock from 'axios'

describe('Test the Test Component', () => { 
    beforeAll(()=>{
        console.log('Log in first to test cards.');
        { debug, container} = render(<Login />);
        debug();
    });

    test('It renders correctly', () => {
        //const tree = renderer.create(<Test />).toTree();
        //expect(tree).toMatchSnapshot();
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