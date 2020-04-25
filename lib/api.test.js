import {render, fireEvent, screen} from '@testing-library/react'
import dao from './DAO';
import axios from 'axios'
import { config } from './config';
import request from 'supertest';
import app from './expressApp';

describe('Test the api calls', () => { 
    // To test your server, import it and give it to supertest.
    /**    
    *   .then(res => {
            // res.body, res.headers, res.status
        })
    */

    test('Insert a card. Positive result', async (done) => {
        // Insert a card.
        // Then query for that users cards and ensure they were stored properly
        const user = {'user_id':1};
        const c = {'card':'TESTCARD','answer':'TESTANSWER','category':'TESTCATEGORY'};
        // const dbCard = {'card_id':newCard_id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id};
        // Use supertest for HTTP:
        request(app)
            .post('/insertCard')
            .send({'card':c,'user_id':1})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err) { return done(err); }
                expect(res.body.card_id).toBeDefined();
                expect(res.body.card).toBe('TESTCARD');
                expect(res.body.answer).toBe('TESTANSWER');
                expect(res.body.owner_id).toBe(1);
                done();
            });
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