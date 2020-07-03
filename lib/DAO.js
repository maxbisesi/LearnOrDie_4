import mysql from "mysql";
import chalk from "chalk";
import util from "util";

class DAO {

  constructor() {
    this._config = {
      connectionLimit: 5,
      host: "localhost",
      user: "root",
      password: "Basketball12",
      database: "FlashCardShark"
    };
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
/*
  connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
      if (error) {
        return connection.rollback(function() {
          throw error;
        });
      }
  
      var log = 'Post ' + results.insertId + ' added';
  
      connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          console.log('success!');
        });
      });
    });
  });
*/
  async runQuery(query,params = []) {
    if( Array.isArray(params) === false){ throw new Error('params must be an Array'); }
    const db = await this.getDatabase();
    console.log(`DAO query:\n ${chalk.bold(query)}`);
    console.log(`query params:\n ${chalk.bold(params)}`);
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