import {render, fireEvent, screen} from '@testing-library/react'
import DAO from './DAO';
import axios from 'axios'
import { config } from './config';
import request from 'supertest';
import app from './expressApp';

describe('Test the api calls', () => { 
    let testCardId;
    let testSessionId;
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
                testCardId = res.body.card_id;
                done();
            });
    });

    test('Save a Session.', async (done) => {  
        console.log(`Save a session, can see test card id: ${testCardId}`);
        const session =  { 'cards_seen': 5,
                            'correct': 5,
                            'incorrect': 5 ,
                            'cards_added': 5,
                            'points_added': 5,
                            'card_sets_added': 5,
                            'user_id': 1};
        request(app)
            .post('/saveSession')
            .send({'session':session})
            .set('Accept', 'application/json')
            .end((err,res) => { 
                if(err) { return done(err); }
                expect(res.status).toBe(200);
                expect(res.body.sessionId).toBeDefined();
                testSessionId = res.body.sessionId;
                done();
            });
    });

    test('Update a card.', async (done) => {
        console.log(`update a card, can sess test session id: ${testSessionId}`);
        const db = new DAO().getDatabase(); // getDatabase
        const testresult = await db.query('SELECT * FROM FlashCards WHERE card_id = ?',[testCardId]);
        expect(testresult.length).toBe(1);
        expect(testresult[0].card).toBe('TESTCARD');
        request(app)
            .post('/updateCard')
            .send({'card_id':testCardId,'card':'UPDATEDTESTCARD','answer':'UPDATETESTANSWER','category':'UPDATETESTCATEGORY'})
            .set('Accept', 'application/json')
            .end((err,res) => { 
                if(err) { return done(err); }
                expect(res.body.card).toBe('UPDATEDTESTCARD');
                expect(res.body.answer).toBe('UPDATETESTANSWER');
                expect(res.body.category).toBe('UPDATETESTCATEGORY');
                expect(res.status).toBe(200);
                done();
            });
    });

    test('Query for updated card.', async (done) => {
        const db = new DAO().getDatabase();
        const testAfterUpdate = await db.query('SELECT * FROM FlashCards WHERE card_id = ?',[testCardId]);
        // TODO fix these quotes
        expect(testAfterUpdate[0].card).toBe("'UPDATEDTESTCARD'");
        expect(testAfterUpdate[0].answer).toBe("'UPDATETESTANSWER'");
        expect(testAfterUpdate[0].category).toBe("'UPDATETESTCATEGORY'");
        done();
    });

    test(' Successful Login ', async (done) => {
        /**
        const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
        res.status(200).type('application/json').send(body);
         */
        request(app)
            .post('/login')
            .send({'user':'maxbisesi','pass':'Basketball12'})
            .set('Accept', 'application/json')
            .end((err,res) => { 
                if(err) { return done(err); }
                expect(res.body.cards.length).toBeGreaterThan(1000);
                expect(res.body.loggedInUser.user_id).toBe(1);
                expect(res.body.sessions.length).toBeGreaterThan(1);
                // expect(res.body.avatar.length).toBeGreaterThanOrEqual(0);
                // expect(res.body.cardSets.length).toBeGreaterThan(0);
                done();
             });
    });
});