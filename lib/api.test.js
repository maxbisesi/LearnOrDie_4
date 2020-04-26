import {render, fireEvent, screen} from '@testing-library/react'
import DAO from './DAO';
import axios from 'axios'
import { config } from './config';
import request from 'supertest';
import app from './expressApp';
import logger from './Logger';

describe('Test the api calls', () => { 
    let testCardId;
    let testSessionId;
    let testUserId;
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

    test('Erroneous login', async (done) => {
        request(app)
        .post('/login')
        .send({'user':'NotFoundo','pass':'nah-nah'})
        .set('Accept', 'application/json')
        .end((err,res) => { 
            if(err) { return done(err); }
            expect(res.status).toBe(403);
         });

         request(app)
         .post('/login')
         .send({'user':'maxbisesi','pass':'WrongPW23'})
         .set('Accept', 'application/json')
         .end((err,res) => { 
             if(err) { return done(err); }
             expect(res.status).toBe(401);
             done();
          });
    });

    test('Register new user', async (done) => {
        // If a username exists you get a 204 status
         request(app)
            .post('/register')
            .send({'user':'maxbisesi'})
            .set('Accept', 'application/json')
            .end( (err,res) => {
                if(err) { return done(err); }
                expect(res.status).toBe(400)
                logger('Register new user: 400 status returned for existing username');
            });

            const testUser = {'user':'tester',
                             'pass':'testpass',
                             'email':'tester@gmail.com'};
            request(app)
            .post('/register')
            .send(testUser)
            .set('Accept', 'application/json')
            .end( (err,res) => {
                if(err) { return done(err); }
                expect(res.status).toBe(200)
                expect(res.body.user.user_id).toBeDefined();
                expect(res.body.user.points).toBe(0);
                expect(res.body.user.rank).toBe('Recruit');
                expect(res.body.user.guest).toBe(false);
                logger(`test register a new user: ${res.body.user.user_id}`);
                testUserId = res.body.user.user_id;
                done();
            });
    });

    afterAll( async(done) => {
        // Delete inserted card:
        const db = new DAO().getDatabase();
        logger(`TEST DATA - card: ${testCardId} - session: ${testSessionId} - user: ${testUserId} -`);
        // db.query(query,[params]);
        const delTestCard = await db.query('DELETE FROM FlashCards WHERE card_id=?',[testCardId]);
        expect(delTestCard.affectedRows).toBe(1);
        logger(`Test Card deleted:\n - ${JSON.stringify(delTestCard)} - \n`);
        
        const delTestSession = await db.query('DELETE FROM UserSessions WHERE session_id=?',[testSessionId]);
        expect(delTestSession.affectedRows).toBe(1);
        logger(`Test user deleted:\n - ${JSON.stringify(delTestSession)} - \n`);

        const delTestUser = await db.query('DELETE FROM FlashUsers WHERE user_id=?',[testUserId]);
        expect(delTestUser.affectedRows).toBe(1);
        logger(`Test user deleted: - ${testUserId} - `);

        logger('TEST DATA CLEANED UP');
        done();
    });
});