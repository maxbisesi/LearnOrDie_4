import DataApi from "../DataApi";
import chalk from "chalk";
/* describe.each
    describe.each(table)(name, fn, timeout
    describe.each([
        [1, 1, 2],
        [1, 2, 3],
        [2, 1, 3],
    ])('.add(%i, %i)', (a, b, expected) => {
    test(`returns ${expected}`, () => {
        expect(a + b).toBe(expected);
    });
*/

// test Get db method in DataApi
test("creates a DB connection and returns an object that creates promises for querying and closing db.", async () => {
  const dataApi = new DataApi();
  // test that it returns an object with the right methods
  const db = await dataApi.getDatabase();
  expect(db).toHaveProperty("query");
  expect(db).toHaveProperty("close");
  //expect(db).toHaveProperty('insert');
  //expect(db).toHaveProperty('update');
  //expect(db).toHaveProperty('delete');
});

describe("Test the database", () => {
  beforeAll(async () => {
    // Create test data
    //const testUserID = await initializeTestDb();
    console.log(chalk.magenta(`before All`));
  });

  afterAll(async () => {
    // Destroy test data
    console.log(chalk.magenta(`after All`));
  });

  // checkCredentials
  test("Test getting a un and pw.", async () => {
    //Insert the test user
    const dataApi = new DataApi();
    const user = {
      username: "TESTUSER87650",
      password: "TESTPASSWORD",
      firstname: "TESTER",
      lastname: "FIGORO",
      email: "TEST.BISESI@GMAIL.NET",
      avatar: "Recruit"
    };

    const testUserId = await dataApi.addFlashUser(user);

    expect(testUserId).toBeDefined();

    // query for the Test user and check his fields.
    const db = await dataApi.getDatabase();
    const queryResult = await db.query(
      `SELECT * FROM flashuser WHERE username='TESTUSER87650' LIMIT 1`
    );

    const testUser = queryResult[0];
    expect(testUser.password).toEqual("TESTPASSWORD");
    expect(testUser.firstname).toEqual("TESTER");
    expect(testUser.lastname).toEqual("FIGORO");
    expect(testUser.email).toEqual("TEST.BISESI@GMAIL.NET");
    expect(testUser.avatar).toEqual("Recruit");

    //Delete the test user
    await dataApi.deleteFlashUser("TESTUSER87650", testUserId);
  });

  test("Test inserting a new Card.", async () => {
    const dataApi = new DataApi();

    // Set up test user to insert card as:
    const user = {
      username: "TESTUSER87650",
      password: "TESTPASSWORD",
      firstname: "TESTER",
      lastname: "FIGORO",
      email: "TEST.BISESI@GMAIL.NET",
      avatar: "Recruit"
    };
    const testUserId = await dataApi.addFlashUser(user);
    // console.log(`test user id in add card test: ${testUserId}`);
    const testCard = {
      answer: "TEST",
      card: "TEST",
      category: "TEST",
      times_wrong: 0,
      times_right: 0,
      fk_user_id: testUserId
    };
    const cardid = await dataApi.addCard(testCard);

    expect(cardid).toBeDefined();

    // Get cards for user
    const cards = await dataApi.getCardsForUser(testUserId);
    console.log(chalk.blue(JSON.stringify(cards)));
    expect(cards.length).toBe(1);
    expect(cards[0].answer).toEqual("TEST");
    expect(cards[0].card).toEqual("TEST");
    expect(cards[0].category).toEqual("TEST");
    expect(cards[0].times_wrong).toEqual("TEST");

    // Delete test data
    //Delete the test user and test card
    const deleteUserResult = await dataApi.deleteFlashUser(
      "TESTUSER87650",
      testUserId
    );
    const deleteCardResult = await dataApi.deleteCard(cardid);
    expect(deleteUserResult).toBe(true);
    expect(deleteCardResult).toBe(true);
  });
});
