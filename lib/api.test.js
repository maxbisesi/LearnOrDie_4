import {render, fireEvent, screen} from '@testing-library/react'
import dao from './DAO';
import axios from 'axios'
import { config } from './config';

describe('Test the api calls', () => { 
    test('Insert a card. Positive result', async () => { 
        // Insert a card.
        // Then query for that users cards and ensure they were stored properly
        const user = {'user_id':1};
        const c = {'card':'TESTCARD','answer':'TESTANSWER','category':'TESTCATEGORY'};
        const axConfig = {
            baseURL: `${config.host}:${config.port}`,
            timeout: 2000,
        };

        const {'card_id':newCard_id,
               'card':card,
               'answer':answer,
               'category':category,
               'owner_id':user_id} = await axios.post('/insertCard',{'card':c,'user_id':user_id});
        
        //Response  -->
        //const dbCard = {'card_id':newCard_id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id};
        const db = new dao().getDatabase();
        const res = await db.query(`SELECT * FROM FlashCard WHERE card_id = ${newCard_id}`);
        expect(res[0].card).toBe('TESTCARD');
        expect(res[0].owner_id).toBe(1);
    });

    /*test('Save a Session.', ()=>{

    });

    test('Update a card.', ()=>{
        
    });

    test('Register a user.', ()=>{

    });

    test('Login.', ()=>{

    });*/
});