import mysql from "mysql";
import chalk from "chalk";
import util from "util";

class DataApi {
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

  async checkCredentials(un, pw) {
    //console.log(chalk.whiteBright(`Checking Credentials: ${un} -- ${pw}`));
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

    if(user[0].password === pw) { return user[0]; }
    
    return 'Invalid password';
  }

  async addCards(cards) {
    //console.log(`DataApi card field: ${card}`); 
    /*
      INSERT INTO tbl_name
        (a,b,c)
      VALUES
        (1,2,3),
        (4,5,6),
        (7,8,9);
        -------------------
        CARD:
        {
          answer,
          card,
          category,
          times_wrong,
          times_right,
          fk_user_id
        }

        {cardid:'id1',
        answer: 'card1',
        card:'fghsdfh',
        category:'cat2',
        times_right:0,
        times_wrong:0,
        owner_id:0,
        fk_user_id:0},

    */
    if(!Array.isArray(cards)) { 
      throw new Error(`DataApi.addCards takes an array of cards not a ${typeof cards}`); 
    }

     let insrt = `
        INSERT INTO flashcard(
          answer,
          card,
          category,
          times_wrong,
          times_right,
          fk_user_id)
        VALUES `;

      for(let i = 0; i < cards.length; i++) { 
        //insrt += `(?,?,?,?,?,?),`;
        insrt += `('${cards[i].answer}','${cards[i].card}','${cards[i].category}',${cards[i].times_wrong},${cards[i].times_right},${cards[i].fk_user_id}),`
      }

      const multInsrt = insrt.slice(0,( insrt.length - 1 ));
      console.log(chalk.yellowBright(`insert query: ${multInsrt}`));
      
      const db = this.getDatabase();
      try {
        const insertedCards = await db.query(multInsrt);
        // console.log(chalk.blue(`Card inserted -> ${JSON.stringify(insertedCard)}`));
        return insertedCards.insertId;
      } catch (e) {
        console.log(chalk.red.bold.bgWhite(`mysql error in addCards`));
        console.log(chalk.red.bold.bgWhite(e));
        this.describeError(e);
      } finally {
        db.close();
      }
  }

  async updateCard(
    card,
    answer,
    category,
    cardid
  ) {
    const cardUpdate = `Update flashcard Set card=?, answer=?, category=? Where cardid=?`;

    const db = this.getDatabase();
    try {
      const updateResult = db.query(cardUpdate, [
        card,
        answer,
        category,
        cardid
      ]);
      return updateResult.affectedRows;
    } catch (e) {
      console.log(chalk.bgRed.black(`mysql error in updateCard`));
      this.describeError(e);
    } finally {
      db.close();
    }
  }

  async updateRating(cardid, whiffed, nailed) { 
    const ratingUpdate = `Update flashcard Set times_right = times_right + ?, times_wrong = times_wrong + 1 Where cardid=?`;

    const db = this.getDatabase();
    try {
      const ratingResult = db.query(ratingUpdate, [
        nailed,
        whiffed,
        cardid
      ]);
      return ratingResult.affectedRows;
    } catch (e) {
      console.log(chalk.bgRed.black(`mysql error in updateRating`));
      this.describeError(e);
    } finally {
      db.close();
    }
  }

  async deleteCards(cardids) {

    if(!Array.isArray(cardids)) { 
      throw new Error(`DataApi.deleteCards takes an array of cards not a ${typeof cards}`); 
    }
    if(cardids.includes(undefined)) {
      throw new Error(`DataApi.deleteCards cannot delete a card with undefined ID`);
    }

    // const query = `DELETE FROM flashcard WHERE cardid IN`;
    let del;
    if(cardids.length === 1) { del = `DELETE FROM flashcard WHERE cardid=${cardids[0]}`; }
    else if(cardids.length > 1) { 
      del = `DELETE FROM flashcard WHERE cardid IN (`;
      cardids.forEach( (part, i, theArray) => {del+=`${theArray[i]},`;} ); 
      del.slice(0,( del.length - 1 ));
      del += `)`;
      console.log(del);
    }

    const db = this.getDatabase();
    try {
      const deletedCard = await db.query(del);  
      console.log(deletedCard);
      //if( deletedCard.affectedRows === 1){ console.log('Delete Successful'); return true}
      //else {console.log('Delete failed'); throw new Error('Delete Card failed');}
    } catch (e) {
      console.log(chalk.bgRed.black(`mysql error in deleteCard`));
      this.describeError(e);
    } finally {
      db.close();
    }
  }

  async saveUserSession(
    cards_seen,
    cards_correct,
    cards_incorrect,
    fk_user_id
  ) {
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
      console.log(chalk.bgRed.black(`mysql error in addCard`));
      this.describeError(e);
    } finally {
      db.close();
    }
  }

  async getCardsForUser(userid) {
    const db = this.getDatabase();
    const cardCount = db.query(`SELECT COUNT(*) FROM flashcard`);
    this.pages = Math.ceil(cardCount / 100);
    console.log(`CARD PAGES ${this.pages}`);

    // set offset for pages
    // Pages are Zero based.
    /* So cardids
       0-100 page1
       101-201 page 2
       202 - 302 page 3
       303 - 403 page 4
    */

    const offset = this.currentPage * 100;
    let cards;
    const getCards =`
            SELECT 
            cardid, answer, 
            card, category, 
            times_right, times_wrong,  
            owner_id, fk_user_id 
            FROM flashcard 
            WHERE fk_user_id= ? 
            ORDER BY cardid
            LIMIT 100 OFFSET ${offset}`;

    try {
      cards = await db.query(getCards, [userid]);
    } catch (err) {
      console.log(chalk.bgRed.black(`mysql error in getCardForUser() Query`));
      this.describeError(err);
      return;
    } finally {
      await db.close();
    }

    // console.log(`Cards: ${chalk.bgWhite.cyan(cards.length)}`);
    this.currentPage++;
    if(this.currentPage >= this.pages) {this.currentPage = 0;}
    return cards;
  }

  async addFlashUser(
    username,
    password,
    firstname,
    lastname,
    email,
    avatar
  ) {
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
      // console.log(chalk.white.bgGreen(`    Inserted user db id: ${userid}`));
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
      // console.log(chalk.red(` delete user -> ${JSON.stringify(deleteResult)}`));
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
      chalk.red.bold.bgWhite(`      DB Error: ${err.sqlMessage}\n`)
    );
    console.log(chalk.red.bold.bgWhite(`     Error Code: ${err.code}\n`));
    console.log(chalk.red.bold.bgWhite(`     Error Number: ${err.errno}\n`));
    console.log(
      chalk.red.bold.bgWhite(`    Failed Query: ${err.sql}\n`)
    );
  }
}
export default DataApi;