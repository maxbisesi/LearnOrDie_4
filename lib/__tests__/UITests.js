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
    const {props, chumWrapper} = chumSetup();
    expect(chumWrapper).toMatchSnapshot();
  });

  test('That card and answer fields clear when submited', () => {
    const { props, chumWrapper } = chumSetup();
    //chumWrapper.find('[name="card"]').simulate('change', {target: {value:'testcard'} });
    //chumWrapper.find('[name="answer"]').simulate('change', {target: {value:'testanswer'} });
    //chumWrapper.find('textarea').first().getElement().value='testcard';
    //chumWrapper.find('textarea').last().getElement().value='testanswer';
    //expect(chumWrapper.state('card')).toBe('testcard');
    //expect(chumWrapper.state('answer')).to.toBe('testanswer');
    chumWrapper.find('input[name="submit"]').simulate('click');
    expect(chumWrapper.state('card')).toBe('');
    expect(chumWrapper.state('card')).toBe('');
  });

});


