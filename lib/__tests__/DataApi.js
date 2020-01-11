import DataApi from '../DataApi';
import chalk from 'chalk';
const dataApi = new DataApi();


// test Get db method in DataApi
test('creates a DB connection and returns an object that creates promises for querying and closing db.', () => {
    // test that it returns an object with the right methods
    const db = dataApi.getDatabase();
    expect(db).toHaveProperty('query');
    expect(db).toHaveProperty('close');
    //expect(db).toHaveProperty('insert');
    //expect(db).toHaveProperty('update');
    //expect(db).toHaveProperty('delete');
});

describe('Test the database', () => {
    //Initialize Test data
    beforeAll(() => {
        // Create test data
        return initializeTestDb();
    });

    afterAll(() => {
        // Destroy test data
        return destroyTestDb();
    });

    // checkCredentials
    test('takes un and pw and checks db if they exist.', async () => {
        const db = dataApi.getDatabase();
        const testUser = db.query(`SELECT * FROM flashuser WHERE username='TESTUSER87650'`);
        expect(testUser.password).toBe('TESTPASSWORD');
        expect(testUser.firstname).toBe('TESTER');
        expect(testUser.lastname).toBe('FIGORO');
        expect(testUser.email).toBe('TEST.BISESI@GMAIL.NET');
        expect(testUser.avatar).toBe('Recruit');
    });

});

function initializeTestDb() {
    console.log(chalk.magenta(`... creating test data.`));
    // Creat test data
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
    const testuserid = dataApi.addFlashUser(testUser);
}

function destroyTestDb() {
    console.log(chalk.magenta(`... destroying test data.`));
    // Destroy test data
}