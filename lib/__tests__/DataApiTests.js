import DataApi from '../DataApi';
import chalk from 'chalk';

const dataApi = new DataApi();

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
test('creates a DB connection and returns an object that creates promises for querying and closing db.', async () => {
    // test that it returns an object with the right methods
    const db = await dataApi.getDatabase();
    expect(db).toHaveProperty('query');
    expect(db).toHaveProperty('close');
    //expect(db).toHaveProperty('insert');
    //expect(db).toHaveProperty('update');
    //expect(db).toHaveProperty('delete');
});

describe('Test the database', () => {
    //Initialize Test data
    beforeAll( async (done) => {
        // Create test data
        //const testUserID = await initializeTestDb();
        console.log(chalk.magenta(`... creating test data.`));
        // Create test user
        const testUser = {
            username: 'TESTUSER87650',
            password: 'TESTPASSWORD',
            firstname: 'TESTER',
            lastname: 'FIGORO',
            email: 'TEST.BISESI@GMAIL.NET',
            avatar: 'Recruit'
        }
        // TODO Set global here 
        const testUserId = await dataApi.addFlashUser(testUser);
        done();
    });

    afterAll( async (done) => {
        // Destroy test data
        console.log(chalk.magenta(`... destroying test data. testuserid: ${testUserID}`));
        // Destroy test User
        await dataApi.deleteFlashUser('TESTUSER87650',testUserID);
        done();
    });

    // checkCredentials
    test('Test getting a un and pw.', async () => {
        const db = await dataApi.getDatabase();
        const queryResult = await db.query(`SELECT * FROM flashuser WHERE username='TESTUSER87650' LIMIT 1`);
        //console.log(chalk.magenta(JSON.stringify(queryResult)));
        const testUser = queryResult[0];
        expect(testUser.password).toEqual('TESTPASSWORD');
        expect(testUser.firstname).toEqual('TESTER');
        expect(testUser.lastname).toEqual('FIGORO');
        expect(testUser.email).toEqual('TEST.BISESI@GMAIL.NET');
        expect(testUser.avatar).toEqual('Recruit');
    });

});

