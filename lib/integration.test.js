import DAO from './DAO';
import axios from 'axios'
import { config } from './config';
import request from 'supertest';
import app from './expressApp';
import logger from './Logger';
import mysql from 'mysql';

test('Test DB transactions', async (done) => {
    const data = new DAO();

    const trans = async (db) => {
        if (err) { throw err; }
        const insres = await db.query(
            `INSERT INTO FlashCards(card,answer,category,owner_id) VALUES(?,?,?,?)`,
            ['TRANSACTIONTEST01','trans test Answer','trans test Category',1]);

        const ressel = await conn.query(
            `SELECT * FROM FlashCards WHERE card=? AND owner_id=? LIMIT 1`,
            ['TRANSACTIONTEST01',1]);

        const id = ressel[0][`card_id`];

        const delres = await conn.query(
            `DELETE FROM FlashCards WHERE card_id=?`,
            [delres]);

        console.log(`/integration: Test DB transaction: deleted card -> ${id} - rows: ${delres.affectedRows}`);                       
    };
    await data.runTransaction(trans);
    done();
});