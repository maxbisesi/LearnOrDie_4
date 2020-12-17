import mysql from "mysql";
import chalk from "chalk";
import util from "util";
import dotenv from 'dotenv';

class DAO {
  constructor() {
    dotenv.config();
    if(process.env.NODE_ENV === 'development') {
      this._config = {
        'connectionLimit': 5,
        'host': process.env.DEVHOST,
        'user': process.env.DEVUSER,
        'password': process.env.DEVPASSWORD,
        'database': process.env.DEVDATABASE,
        'charset':process.env.DEVCHARSET
      };
    } else { 
      this._config = {
        'connectionLimit': 5,
        'host': process.env.PRODHOST,
        'user': process.env.PRODUSER,
        'password': process.env.PRODPASSWORD,
        'database': process.env.PRODDATABASE,
        'charset':process.env.DEVCHARSET
      };
    }


    this.pages = 1;
    this.currentPage = 0;
  }

  getDatabase() {
    const connection = mysql.createConnection(this._config);
    // Return an object that promisfys mysql connection methods,
    // use call() to call those methods with the above connection.
    return {
      query(sql, args) {
        return util.promisify(connection.query).call(connection, sql, args);
      },
      close() {
        return util.promisify(connection.end).call(connection);
      }
    };
  }
  
  async runQuery(query,params = []) {
    if( Array.isArray(params) === false){ throw new Error('params must be an Array'); }
    const db = await this.getDatabase();
    // console.log(`DAO query:\n ${chalk.bold(query)}`);
    // console.log(`query params:\n ${chalk.bold(params)}`);
    try {
      let result = await db.query(query, params);
      return result; 
    } catch (err) {
      console.log(chalk.bgRed.black(`mysql error in runQuery\n`));
      this.describeError(err,query);
      return;
    } finally {
      console.log(chalk.black.bgYellowBright('CLOSE DB CONNECTION'));
      await db.close();
    }
  }

  describeError(err,qString) {
    console.log(chalk.red.bold.bgWhite(`     MySQL Message: ${err.sqlMessage}\n`));
    console.log(chalk.red.bold.bgWhite(`     Error Code: ${err.code}\n`));
    console.log(chalk.red.bold.bgWhite(`     Error Number: ${err.errno}\n`));
    console.log(
      chalk.red.bold.bgWhite(`    Failed Query: ${err.sql}\n`)
    );
    console.log(
      chalk.red.bold.bgWhite(`    Ran as: ${qString}\n`)
    );
  }

} export default DAO;