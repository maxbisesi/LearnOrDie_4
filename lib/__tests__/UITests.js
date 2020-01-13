import React from 'react';
import renderer from 'react-test-renderer';
import { Chum } from '../components/Chum';
import Home from '../components/Home';
import Test from '../components/Test';
import Galley from '../components/Galley';
import Login from '../components/Login';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//Test the UI using Snapshot testing

/* describe.each
    describe.each(table)(name, fn, timeout
    describe.each([
        [1, 1, 2],
        [1, 2, 3],
        [2, 1, 3],
    ])('.add(%i, %i)', (a, b, expected) => {
    test(`returns ${expected}`, () => {
        expect(a + b).toBe(expected);
    });
*/

// create mock methods 
const [ addCard ] = new Array(1).fill(jest.fn());

function chumSetup() { 

    configure({ adapter: new Adapter() });

    const props = { 
        'addCard': addCard
    };

    const chumWrapper = shallow(<Chum {...props} />);
    return {
        props,
        chumWrapper
    };
    
}

describe('Test the Chum Component', () => {

  test('It renders correctly', () => {
    const wrapper = chumSetup();
    expect(wrapper).toMatchSnapshot();
  });

});


