import {render, fireEvent, screen} from '@testing-library/react'
import dao from '../../../DAO';
import axios from 'axios'
describe('Test the api calls', () => { 

    test('Insert a card. Positive result', async () => { 
        const user = {'user_id':1};
        const c = {'card':'TESTCARD','answer':'TESTANSWER','category':'TESTCATEGORY'};
        const newCardResponse = await axios.post('/insertCard',{'card':card, 'user_id':user_id});
        //Response  -->
        //const dbCard = {'card_id':newCard_id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id};
        
    });

    test('Save a Session.', ()=>{

    });

    test('Update a card.', ()=>{
        
    });

    test('Register a user.', ()=>{

    });

    test('Login.', ()=>{

    });
});