import {render, fireEvent, screen} from '@testing-library/react'
import DAO from './DAO';
import axios from 'axios'
import { config } from './config';
import request from 'supertest';
import app from './expressApp';
import logger from './Logger';
import mysql from 'mysql';

describe('Test the api calls', () => { 
    let testCardId;
    let testSessionId;
    let testUserId;
    let testSetId;

    test('Insert a card.', async (done) => {
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
                expect(res.status).toBe(200);
                expect(res.body.card_id).toBeDefined();
                expect(res.body.card).toBe('TESTCARD');
                expect(res.body.answer).toBe('TESTANSWER');
                expect(res.body.owner_id).toBe(1);
                testCardId = res.body.card_id;
                done();
            });
    });

    test('Insert a card list.', async (done) => {
        // Insert a card.
        // Then query for that users cards and ensure they were stored properly
        const noIdCards = [];
        for(let i =0; i<100; i++) {
            noIdCards.push({'card':`CARDLIST-TESTCARD-${i}`,'answer':`CARDLIST-TESTANSWER-${i}`,'category':`TESTCAT-${i}`});
        }
        //Responds with list of ids for the cards, indexs line up with the list passed in.
        request(app)
            .post('/insertCardList')
            .send({'cards':noIdCards,'user_id':1})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err) { return done(err); }
                expect(res.status).toBe(200);
                expect(res.body.cards.length).toBe(noIdCards.length);
                res.body.cards.forEach((c) => { expect(c).toHaveProperty('card_id'); });
                done();
            });
    });

    test('Save a Session.', async (done) => {  
        console.log(`Save a session, can see test card id: ${testCardId}`);
        const session =  { 'correct': 5,
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
            });
        db.close();
        done();
    });

    test('Query for updated card.', async (done) => {
        const db = new DAO().getDatabase();
        const testAfterUpdate = await db.query('SELECT * FROM FlashCards WHERE card_id = ?',[testCardId]);
        // TODO fix these quotes
        expect(testAfterUpdate[0].card).toBe("'UPDATEDTESTCARD'");
        expect(testAfterUpdate[0].answer).toBe("'UPDATETESTANSWER'");
        expect(testAfterUpdate[0].category).toBe("'UPDATETESTCATEGORY'");
        db.close();
        done();
    });

    test('Successful Login ', async (done) => {
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
                //expect(res.body.sessions.length).toBeGreaterThan(1);
                expect(res.body.loggedInUser.points).toBeGreaterThanOrEqual(0);
                expect(res.body.loggedInUser.userrank).toBeDefined();
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
                expect(res.body.user.username).toBeDefined();
                expect(res.body.user.email).toBeDefined();
                expect(res.body.user.points).toBe(0);
                expect(res.body.user.userrank).toBe('Recruit');
                logger(`test register a new user: ${res.body.user.user_id}`);
                testUserId = res.body.user.user_id;
                done();
            });
    });

    test.only('Create card set', async(done) =>{
        // Test data
        const dataDAO = new DAO();
        const testCards = [];
        let results = dataDAO.runQuery('SELECT * FROM FlashCards WHERE owner_id = 1 LIMIT 10');
        for(let i =0; i < 10; i++) {
            testCards.push(results[i]);
        }
        request(app)
            .post('/createSet')
            .send({'user_id': 1, 'cards':testCards, 'setname':'TESTSET', 'description':'THIS WAS CREATED FOR A TEST RUN'})
            .set('Accept', 'application/json')
            .end( (err,res) => {
                if(err) { return done(err); }
                expect(res.status).toBe(200);
                expect(res.body.set_id).toBeDefined();
                expect(res.body.description).toBe('THIS WAS CREATED FOR A TEST RUN');
                expect(res.body.cards.length).toBe(10);
                expect(res.body.setname).toBe('TESTSET');
                logger(` test Create Card Set: ${res.body.set_id} `);
                testSetId = res.body.set_id;
            });
        done();
    });

    afterAll( async(done) => {
        // Delete inserted card:
        const db = new DAO().getDatabase();
        logger(`TEST DATA - card: ${testCardId} - session: ${testSessionId} - user: ${testUserId} - cardSet: ${testSetId}`);
        // db.query(query,[params]);
        // Delete test card
        const delTestCard = await db.query('DELETE FROM FlashCards WHERE card_id=?',[testCardId]);
        expect(delTestCard.affectedRows).toBe(1);
        logger(`Test Card deleted:\n - ${JSON.stringify(delTestCard)} - \n`);
        
        // Delete test session
        const delTestSession = await db.query('DELETE FROM UserSessions WHERE session_id=?',[testSessionId]);
        expect(delTestSession.affectedRows).toBe(1);
        logger(`Test user deleted:\n - ${JSON.stringify(delTestSession)} - \n`);

        // Delete test user
        const delTestUser = await db.query('DELETE FROM FlashUsers WHERE user_id=?',[testUserId]);
        expect(delTestUser.affectedRows).toBe(1);
        logger(`Test user deleted: - ${testUserId} - `);

        // Delete card list
        const delCardList = await db.query(`DELETE FROM FlashCards WHERE card LIKE 'CARDLIST-TESTCARD-%' AND answer LIKE 'CARDLIST-TESTANSWER-%'`);
        expect(delCardList.affectedRows).toBe(100);
        logger(`Test card list deleted`);

        // Delete test card set
        // CardSetCards are on delete cascade for their two ids looking up to card_id and set_id
        // So if either teh card or the cardset is deleted the CardSetCard is too
        // CardSetUsers are on delete cascade for set_id and user_id
        // So if the user or the set is deleted the CardSetUsers linking table should be too
        // --- Delete the test set, this should delete the CardSetCards records and the CardSetUser record ---
        const delCardSet = await db.query(`DELETE FROM CardSets WHERE set_id = ?`,[testSetId]);
        expect(delCardSet.affectedRows).toBe(1);
        //expect(delCardSet.affectedRows).toBe(1);
        // Shouldn't be any linking tables left
        const cscardsDelResult = await db.query(`SELECT * FROM CardSetCards WHERE set_id = ?`,[testSetId]);
        logger(`delete card set card result: ${JSON.stringify(cscardsDelResult)} --`);
        expect(cscardsDelResult.length).toBe(0)
        // shoudln't be any7 tables linking to user
        const csUserDelResult = await db.query(`SELECT * FROM CardSetUsers WHERE set_id = ?`,[testSetId]);
        logger(`delete card set user result: ${JSON.stringify(csUserDelResult)} --`);
        expect(csUserDelResult.length).toBe(0)


        // RESET Card AUTO IDs after tests
        const getCardMaxID = await db.query('SELECT MAX(card_id) as maxid FROM FlashCards');
        logger(`max card_id after deletes: ${getCardMaxID[0].maxid}`);
        const nextAutoID = getCardMaxID[0].maxid;
        const resetCardAuto = await db.query(`ALTER TABLE FlashCards AUTO_INCREMENT = ?`,[nextAutoID]);
        // SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'FlashCardShark' AND TABLE_NAME='FlashCards';
        // RESET User AUTO IDs after tests
        const getUserMaxID = await db.query('SELECT MAX(user_id) as maxid FROM FlashUsers');
        logger(`max user_id after deletes: ${getUserMaxID[0].maxid}`);
        const nextUserID = getUserMaxID[0].maxid;
        const resetUserAuto = await db.query(`ALTER TABLE FlashCards AUTO_INCREMENT = ?`,[nextUserID]);
        // RESET Session AUTO IDs after tests
        const getSessionrMaxID = await db.query('SELECT MAX(session_id) as maxid FROM UserSessions');
        logger(`max session_id after deletes: ${getSessionrMaxID[0].maxid}`);
        const nextSessionID = getSessionrMaxID[0].maxid;
        const resetSessionAuto = await db.query(`ALTER TABLE FlashCards AUTO_INCREMENT = ?`,[nextSessionID]);
        // RESET CardSet Ids
        const getCardSetMaxId = await db.query('SELECT MAX(set_id) as maxsetid FROM CardSets');
        logger(`max set_id after deletes: ${getCardSetMaxId[0].maxsetid}`);
        const nextCardSetId = getSessionrMaxID[0].maxid;
        const resetCardSetAuto = await db.query(`ALTER TABLE CardSets AUTO_INCREMENT = ?`,[nextCardSetId]);

        db.close();
        logger('TEST DATA CLEANED UP');
        done();
    });

});

