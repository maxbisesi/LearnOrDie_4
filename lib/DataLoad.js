import mysql from "mysql";
import chalk from "chalk";
import util from "util";
import { fail } from 'assert';

const loadData = async () => {

    function connectToNewDB() {
        const newConfig = {
        connectionLimit: 5,
        host: "localhost",
        user: "root",
        password: "Basketball12",
        database: "FlashCardShark"
        };

        const connection = mysql.createConnection(newConfig);
        // Return an object that promisfys mysql connection methods,
        // use call() to call those methods with the above connection.
        console.log(chalk.green('Connected to new.'));
        return {
            query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
            },
            close() {
            return util.promisify(connection.end).call(connection);
            }
        };
    }

    function connectToOldDB() {
        const oldConfig = {
        connectionLimit: 5,
        host: "localhost",
        user: "root",
        password: "Basketball12",
        database: "FCS_OLD"
        };

        const connection = mysql.createConnection(oldConfig);
        // Return an object that promisfys mysql connection methods,
        // use call() to call those methods with the above connection.
        console.log(chalk.green('Connected to OLD.'));
        return {
            query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
            },
            close() {
            return util.promisify(connection.end).call(connection);
            }
        };
    }

    const fcs = connectToNewDB();
    const fcs_old = connectToOldDB();

    const cards = await fcs_old.query('select * From flashcard where fk_user_id=5');
    console.log(`old cards length: ${chalk.green(JSON.stringify(cards[0]))}`);
    //{"cardid":27,"answer":"j","card":"identifier","category":"Exceptions","times_wrong":0,"times_right":8,"owner_id":null,"fk_user_id":5}
    for( let i=0; i<cards.length; i++) {
        const {answer,card,category,times_wrong,times_right} = cards[i];
        const insCard = await fcs.query('Insert into FlashCards(card,answer,category,owner_id) values(?,?,?,?)',[card,answer,category,1]);
        if(insCard.insertId === undefined || insCard.insertId === null) {fail('Card insertId undefined or null');}
        if(insCard.affectedRows !== 1) {fail('Card affected rows not 1')}
        console.log(`- ${chalk.blueBright(i)} - inserted card: ${chalk.blueBright(insCard.insertId)}`)
        const insUserCard = await fcs.query('Insert into FlashCardUsers(card_id, user_id, correct, incorrect) values(?,?,?,?)',[insCard.insertId,1,0,0]);
        if(insUserCard.affectedRows !== 1){ fail('FlashCardUser affectedRows not 1'); }
    }

}

export default loadData;

  