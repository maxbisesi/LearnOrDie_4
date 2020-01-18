import React from 'react';
import { Chum } from '../components/Chum';
import { Home } from '../components/Home';
import { Test } from '../components/Test';
import { Galley } from '../components/Galley';
import { Login } from '../components/Login';
import { shallow, configure } from 'enzyme';

/* Test the UI using Snapshot testing

    describe.each
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
const [addCard] = new Array(1).fill(jest.fn());

function getWrapper(component) {
    let props;
    switch (component) {
      case `Chum`:
        props = { addCard: addCard };
        const chumWrapper = shallow(<Chum {...props} />);
        return { props, chumWrapper };
      case 'Home':
        props = {};
        const homeWrapper = shallow(<Home {...props} />);
        return { props, homeWrapper };
    }
};


describe('Test the Chum Component', () => {
  
  test('It renders correctly', () => {
    const { props, chumWrapper } = getWrapper('Chum');
    expect(chumWrapper).toMatchSnapshot();
  });

  test('That card and answer text fields update state and are cleared when submitted.', () => {
    const mockAddCard = jest.fn();
    const chumWrapper = shallow(<Chum addCard={mockAddCard}/>);

    chumWrapper.find({ name:"card" }).simulate('change', {target: { name:'card', value:'testcard'} });
    chumWrapper.find({ name:"answer"}).simulate('change', {target: {name:'answer', value:'testanswer'} });

    // console.log(`Chum state: ${chumWrapper.state}`);
    expect(chumWrapper.state('card')).toBe('testcard');
    expect(chumWrapper.state('answer')).toBe('testanswer');

    chumWrapper.find({ name:"submit" }).simulate('click');

    expect(chumWrapper.state('card')).toBe('');
    expect(chumWrapper.state('answer')).toBe('');
  });

});

describe('Test the Home Component', () => {

  test('It renders correctly', () => {
    const { props, homeWrapper } = getWrapper('Home');
    expect(homeWrapper).toMatchSnapshot();
  });

});
