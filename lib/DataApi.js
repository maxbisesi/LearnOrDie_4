import mysql from "mysql";
import chalk from "chalk";
import util from "util";

class DataApi {
  constructor() {
    // TODO create stored procedures
    this._config = {
      connectionLimit: 5,
      host: "localhost",
      user: "root",
      password: "Basketball12",
      database: "FCSRemoteCopy"
    };
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

  async checkCredentials(un, pw) {
    console.log(chalk.whiteBright(`Checking Credentials: ${un} -- ${pw}`));
    const getuser = `Select * from flashuser Where username= ? Limit 1`;
    const db = this.getDatabase();
    let user;

    try {
      user = await db.query(getuser, [un]);
    } catch (err) {
      console.log(chalk.bgRed.black(`mysql error in checkCredentials Query`));
      this.describeError(err);
      return;
    } finally {
      await db.close();
    }

    if (user.length === 0) {
      console.log(`${chalk.bgRed("User Not Found")}`);
      return "Not Found";
    }

    console.log(
      `User: un ${chalk.bgWhite.cyan(
        user[0].username
      )} --- pw ${chalk.bgWhite.cyan(user[0].password)}`
    );
    return user[0];
  }

  async addCard({
    answer,
    card,
    category,
    times_wrong,
    times_right,
    fk_user_id
  }) {
    const newCard = `Insert into flashcard(
            answer,
            card,
            category,
            times_wrong,
            times_right,
            fk_user_id)       
            Values(?,?,?,?,?,?)`;
    const db = this.getDatabase();
    try {
      const card = await db.query(newCard, [
        answer,
        card,
        category,
        times_wrong,
        times_right,
        fk_user_id
      ]);
      console.log(chalk.blue(JSON.stringify(card)));
      return card.insertId;
    } catch (e) {
      console.log(chalk.red.bold.bgWhite(`mysql error in addCard`));
      console.log(chalk.red.bold.bgWhite(e));
      this.describeError(e);
    } finally {
      db.close();
    }
  }

  async updateCard({
    answer,
    card,
    category,
    times_wrong,
    times_right,
    cardid
  }) {
    const cardUpdate = `Update flashcard Set card=?, answer=?, times_wrong=?, times_right=?, category=? Where cardid=?`;

    const db = this.getDatabase();
    try {
      const card = db.query(cardUpdate, [
        card,
        answer,
        times_wrong,
        times_right,
        cardid
      ]);
      return card.affectedRows;
    } catch (e) {
      console.log(chalk.bgRed.black(`mysql error in updateCard`));
      this.describeError(err);
    } finally {
      db.close();
    }
  }

  async deleteCard(cardid) {
    const card = `DELETE FROM flashcard WHERE cardid=?`;

    const db = this.getDatabase();
    try {
      deletedCard = db.query(card,[cardid]);  
      return deletedCard.affectedRows === 1;
    } catch (e) {
      console.log(chalk.bgRed.black(`mysql error in deleteCard`));
      this.describeError(err);
    } finally {
      db.close();
    }
  }

  async saveUserSession({
    cards_seen,
    cards_correct,
    cards_incorrect,
    fk_user_id
  }) {
    const session = `Insert into usersession(cards_seen,cards_correct,cards_incorrect,fk_user_id) Values(?,?,?,?)`;
    const db = this.getDabase();
    try {
      const sesh = db.query(session, [
        cards_seen,
        cards_correct,
        cards_incorrect,
        fk_user_id
      ]);
      return sesh.insertId;
    } catch (e) {
      console.log(chalk.bgRed.black(`mysql error in updateCard`));
      this.describeError(err);
    } finally {
      db.close();
    }
  }

  async getCardsForUser(userid) {
    const db = this.getDatabase();
    let queryResults = [];
    let cards;
    const getCards = `
            Select 
            cardid, answer, 
            card, category, 
            times_right, times_wrong,  
            owner_id, fk_user_id 
            From flashcard 
            Where fk_user_id= ? LIMIT 100`;

    try {
      cards = await db.query(getCards, [userid]);
    } catch (err) {
      console.log(chalk.bgRed.black(`mysql error in getCardForUser() Query`));
      this.describeError(err);
      return;
    } finally {
      await db.close();
    }

    console.log(`Cards: ${chalk.bgWhite.cyan(cards.length)}`);
    return cards;
  }

  async addFlashUser({
    username,
    password,
    firstname,
    lastname,
    email,
    avatar
  }) {
    // inserts a new user into flashUser
    // returns the database's userid

    /*
        This is what an insert statement returns: 

        {"fieldCount":0,"affectedRows":1,"insertId":43,"serverStatus":2,
        "warningCount":0,"message":"","protocol41":true,"changedRows":0}

        remember db.query returns an ARRAY! -->  []  <-- of results.

        */
    const db = this.getDatabase();
    const insertUser = `Insert into flashuser(username,password,firstname,lastname,email,avatar) values(?,?,?,?,?,?)`;
    let userid;

    try {
      let user = await db.query(insertUser, [
        username,
        password,
        firstname,
        lastname,
        email,
        avatar
      ]);
      userid = user.insertId;
      console.log(chalk.white.bgGreen(`    Inserted user db id: ${userid}`));
    } catch (err) {
      console.log(chalk.bgRed.black(`mysql error in getCardForUser() Query`));
      this.describeError(err);
      return;
    } finally {
      await db.close();
    }

    if (userid !== undefined) {
      return userid;
    }
    throw new Error("addFlashUser: Insert statement failed, userid undefined.");
  }

  async deleteFlashUser(username, userid) {
    // deletes a user
    // returns deleted users username

    /*
        This is what an insert statement returns: 

        {"fieldCount":0,"affectedRows":1,"insertId":43,"serverStatus":2,
        "warningCount":0,"message":"","protocol41":true,"changedRows":0}

        remember db.query returns an ARRAY! -->  []  <-- of results.

        */

    const db = this.getDatabase();
    const deleteUser = `Delete from flashuser where username=? AND user_id=?`;

    try {
      let deleteResult = await db.query(deleteUser, [username, userid]);
      console.log(chalk.red(` delete user -> ${JSON.stringify(deleteResult)}`));
      return deleteResult.affectedRows === 1;
    } catch (err) {
      console.log(chalk.bgRed.black(`mysql error in getCardForUser() Query`));
      this.describeError(err);
      return;
    } finally {
      await db.close();
    }
  }

  describeError(err) {
    console.log(
      chalk.red.bold.bgWhite(`     Error connecting to DB: ${err.sqlMessage}\n`)
    );
    console.log(chalk.red.bold.bgWhite(`     Error Code: ${err.code}\n`));
    console.log(chalk.red.bold.bgWhite(`     Error Number: ${err.errno}\n`));
    console.log(
      chalk.red.bold.bgWhite(`    Failed Query: ${err.sql}\n`)
    );
  }
}
export default DataApi;
