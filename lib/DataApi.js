import mysql from 'mysql';
import chalk from 'chalk';
import User from './User';
class DataApi {
    #connection;
    #pool;
    #users;
    constructor() {
        // TODO create stored procedures
        //Connect with the db,create pool for connections
        this.#pool = mysql.createPool({
            connectionLimit: 5,
            host: '',
            user: '',
            password: '',
            database: ''
        });
        this.getAllUsers();
    }

    checkCredentials(un, pw) {
        const query = `Select * from flashuser Where username=${un}`;
        #pool.getConnection((err, connection) => { 
            if (err) {
                console.log(chalk.bgRed.black(`mysql error in findUser() connection`));
                this.describeError(err);
                // TODO throw exception
                return;
            }

            connection.query(query, (err, results, fields) => { 
                if (err) {
                    console.log(chalk.bgRed.black(`mysql error in findUser() query`));
                    this.describeError(err);
                    // TODO throw exception
                    return;
                }
                if (results.length === 0) { return 'Not found' }
                if (results.password !== pw) { return 'Invalid password' }
                if (results.password === pw) { return new User() }
            });
        });
    }

    describeError(err) {
        console.log(chalk.red.bold.bgWhite(`     Error connecting to DB: ${err.sqlMessage}\n`);
        console.log(chalk.red.bold.bgWhite(`     Error Code: ${err.code}\n`);
        console.log(chalk.red.bold.bgWhite(`     Error Number: ${err.errno}\n`);
        console.log(chalk.yellowBright.bold.bgWhite(`    Failed Query: ${err.sql}\n`);
        return;
    }
    

}
export default DataApi;