import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import { loginData } from '../loginData';
import logger from '../../logger';

dotenv.config();

Before(async function () {
    // {tags: '@FCSisShown and @UserAfterLoginSeeProfile'}
  logger(`Before: Initializing webdriver for ${process.env.TEST_BROWSER}`);
  this.driver = new webdriver.Builder()
    .forBrowser(process.env.TEST_BROWSER || "chrome") // to use Firefox do .forBrowser("firefox")
    .build();
  return this.driver;
});

After(async function () {
  // {tags: '@FCSisShown and @UserAfterLoginSeeProfile'}
  this.driver.quit();
});

When('The user navigates to FlashCardShark',{ timeout: 400000 }, async function() {
    logger('Navigating to FlashCardShark');
    await this.driver.get(`http://${process.env.HOST}:${process.env.PORT}`);
    const title = await this.driver.getTitle();
    await this.driver.wait(() => { return title === 'Flash Card Shark'; }, 5000);
    logger(`... title 'Flash Card Shark' shown.`);
    //assert.equal(title,'Flash Card Shark');
});

When('The user logs in as: {string}',{ timeout: 400000 }, async function(usertype) {
    logger(`Logging in as ${usertype}`);
    const usernameField = await this.driver.wait(until.elementLocated(By.id('username'), 3000));
    const passwordField = await this.driver.wait(until.elementLocated(By.id('password'), 3000));
    const loginButton = await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000));
    switch(usertype) {
        case `TestUser01`: 
            logger(`Sending credentials: us:${loginData.QATestUser.username} - pw:${loginData.QATestUser.password}`);
            await usernameField.sendKeys(`${loginData.QATestUser.username}`);
            await passwordField.sendKeys(`${loginData.QATestUser.password}`);
            await loginButton.click();
            break;
        default: throw new Error(`Unknown usertype: ${usertype}`);
    }
    logger(`... credentials sent.`);
});

Then('The {string} Tab is shown',{ timeout: 400000 }, async function(tabname) {
    logger(`Is the ${tabname} tab is shown?`);
    switch(tabname) {
        case `Login`:
            await this.driver.wait(until.elementLocated(By.id('BTTW')), 10000);
            assert.ok(await this.driver.findElement(By.id('loginbutton')));
            break;
        case `Profile`: break;
        default: throw new Error(`${tabname} tab not defined.`);
    }
});


