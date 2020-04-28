import DAO from './DAO';
import axios from 'axios'
import { config } from './config';
import request from 'supertest';
import app from './expressApp';
import logger from './Logger';
import mysql from 'mysql';

test('Test DB transactions', async (done) => {
    const _config = {
        connectionLimit: 5,
        host: "localhost",
        user: "root",
        password: "Basketball12",
        database: "FlashCardShark"
    };

    const db = new DAO().getDatabase();

    const trans = async (err) => {
        if (err) { throw err; }
        const res = await db.query(`INSERT INTO FlashCards(card,answer,category,owner_id) 
                                VALUES(?,?,?,?)`,['TRANS Test card 0999','trans test Answer','trans test Category',777]);
        await db.commit((err) =>{ if (err) { throw err; } });
        
    };

    const transaction = db.getTransaction();
    await transaction(trans);
    await db.close();
    /*const connection = mysql.createConnection(_config);
    await connection.beginTransaction((err)=> {

        connection.query(`INSERT INTO FlashCards(card,answer,category,owner_id) 
                            VALUES(?,?,?,?)`,['TRANS Test card','trans test Answer',
                            'trans test Category',1],function (error, results, fields) { 
                                if (error) {
                                    return connection.rollback(function() {
                                      throw error;
                                    });
                                }
        });

        connection.commit(function(err) {
            if (err) {
            return connection.rollback(function() {
                throw err;
            });
            }
            console.log('success!');
        });

    });*/
    done();
});