import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import { processDatatable } from '../../Utils';
import LoginProfile from '../pages/LoginProfile';
import { loginData } from '../loginData';

dotenv.config();

Before(async function () {
    // {tags: '@FCSisShown and @UserAfterLoginSeeProfile'}
  logger(`Before: Initializing webdriver for ${process.env.TEST_BROWSER}`);
  this.driver = new webdriver.Builder()
    .forBrowser(process.env.TEST_BROWSER || "chrome") // to use Firefox do .forBrowser("firefox")
    .build();
  this.waitTime = 1000;
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
    logger(`On 'Flash Card Shark' ...`);
    logger(`-------------------------`);
    loginData.currentPage = new LoginProfile(this.driver);
    logger(`On the App, first page object is: ${JSON.stringify(loginData.currentPage)}`);
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

When('The user logs in as: {string}',{ timeout: 400000 }, async function(usertype) {
    //const loginPage = new LoginProfile();
    logger(`Logging in as ${usertype}`);
    logger(`-------------------------`);
    await loginData.currentPage.login(usertype);
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

When('The user clicks the {string} button',{timeout:400000}, async function(buttonname) {
    logger(`-------------------------`);
    await loginData.currentPage.clickButton(buttonname);
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

When('The user fills the form with the following values:',{timeout:400000}, async function(vals) {
    logger(`-------------------------`);
    logger(`Filling form, processing datatable..`);
    let table = processDatatable(vals);
    const fillres = await loginData.currentPage.fillForm(table);
    logger(`-------------------------`);
    if(fillres !== true) { 
        logger(`Result: ${JSON.stringify(fillres)}`);
        throw new Error(`Error filling form on page ${loginData.currentPage.pageName}`);
    }
});

When('The user goes to the {string} Tab',{ timeout: 400000 }, async function(tabname) {
    
});

Then('The {string} Tab is shown',{ timeout: 400000 }, async function(tabname) {
    logger(`-------------------------`);
    logger(`Is the ${tabname} tab shown?`);
    switch(tabname) {
        case `Login`:
            const bttw = await loginData.currentPage.validateField('Brave the Treacherour Waters');
            assert.ok(bttw);
            break;
        case `Profile`:
            const rank = await loginData.currentPage.validateField(`Profile Rank`);
            assert.ok(rank);
            break;
        default: throw new Error(`${tabname} tab not defined.`);
    }
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

Then('The form matches the following values:', {timeout: 400000 }, async function(datatable) {
    logger(`-------------------------`);
    const tableVals = processDatatable(datatable);
    const testResult = await loginData.currentPage.validateForm(tableVals);
    logger(`test result: ${testResult}`);
    if (testResult !== `Pass`) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});




