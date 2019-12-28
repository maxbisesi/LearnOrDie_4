import mysql from 'mysql';
import chalk from 'chalk';
import util from 'util';

class DataApi {
    constructor() {
        // TODO create stored procedures
        this._config = {
        connectionLimit: 5,
        host: 'localhost',
        user: 'root',
        password: 'Basketball12',
        database: 'FCSRemoteCopy'};
    }

    getDatabase() {
        const connection = mysql.createConnection(this._config);
        // Return an object that promisfys mysql connection methods,
        // use call() to call those methods with the above connection.
        return {
            query(sql,args){
                return util.promisify(connection.query)
                    .call( connection,sql,args );
            },
            close(){
                return util.promisify(connection.end).call(connection);
            }
        };
    }

    async checkCredentials(un, pw) {
        console.log(chalk.greenBright(`Checking Credentials: ${un} -- ${pw}`));
        const getuser = `Select * from flashuser Where username= ? Limit 1`;
        const db = this.getDatabase();
        let user;

        try {
            user = await db.query(getuser,[un]);
        } catch( err ){
            console.log(chalk.bgRed.black(`mysql error in checkCredentials Query`));
            this.describeError(err);
            return;
        } finally {
            await db.close();
        }

        if(user.length === 0) {
            console.log(`${chalk.bgRed('User Not Found')}`);
            return 'Not Found';
        }

        console.log(`User: un ${chalk.bgWhite.cyan(user[0].username)} --- pw ${chalk.bgWhite.cyan(user[0].password)}`);
        return user[0];
    }

    

    async getCardsForUser(userid) {
        const db = this.getDatabase();
        let queryResults = [];
        let cards;
        const getCards =`
            Select 
            cardid, answer, 
            card, category, 
            times_right, times_wrong,  
            owner_id, fk_user_id 
            From flashcard 
            Where fk_user_id= ? LIMIT 101`;

        try{
            cards = await db.query(getCards,[userid]);
        } catch( err ){
            console.log(chalk.bgRed.black(`mysql error in getCardForUser() Query`));
            this.describeError(err);
            return;
        } finally {
            await db.close();
        }

        console.log(`Cards: ${chalk.bgWhite.cyan(cards.length)}`);
        return cards;
    }

    describeError(err) {
        console.log(chalk.red.bold.bgWhite(`     Error connecting to DB: ${err.sqlMessage}\n`));
        console.log(chalk.red.bold.bgWhite(`     Error Code: ${err.code}\n`));
        console.log(chalk.red.bold.bgWhite(`     Error Number: ${err.errno}\n`));
        console.log(chalk.yellowBright.bold.bgWhite(`    Failed Query: ${err.sql}\n`));
    }
    

}
export default DataApi;