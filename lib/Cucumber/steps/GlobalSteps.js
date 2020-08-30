import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import { processDatatable } from '../../Utils';
import LoginProfile from '../pages/LoginProfile';
import { loginData } from '../loginData';
import ChumTab from '../pages/ChumTab';
import GalleyTab from '../pages/GalleyTab';
import HomeTab from '../pages/HomeTab';
import TestTab from '../pages/TestTab';

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

When('The user navigates to FlashCardShark',{ timeout: 4000 }, async function() {
    logger('Navigating to FlashCardShark');
    await this.driver.get(`http://${process.env.HOST}:${process.env.PORT}`);
    const title = await this.driver.getTitle();
    await this.driver.wait(() => { return title === 'Flash Card Shark'; }, 5000);
    logger(`On 'Flash Card Shark' ...`);
    logger(`-------------------------`);
    loginData.currentPage = new LoginProfile(this.driver);
    //logger(`On the App, first page object is: ${JSON.stringify(loginData.currentPage)}`);
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

When('The user logs in as: {string}',{ timeout: 4000 }, async function(usertype) {
    //const loginPage = new LoginProfile();
    logger(`Logging in as ${usertype}`);
    logger(`-------------------------`);
    await loginData.currentPage.login(usertype);
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

When('The user uses the app as a Guest', { timeout: 4000 }, async function() {
    loginData.loginStatus.loggedIn = false;
    loginData.loginStatus.username = 'GUESTUSER';
    loginData.loginStatus.password = 'GUESTUSER';
});


When('The user clicks the {string} button',{timeout:4000}, async function(buttonname) {
    logger(`-------------------------`);
    await loginData.currentPage.clickButton(buttonname);
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

When('The user fills the form with the following values:',{timeout:4000}, async function(vals) {
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

When('The user switches to the {string} Tab',{ timeout: 4000 }, async function(tabname) {
    logger(`-------------------------`);
    switch(tabname) {
        case `Chum`: 
            await this.driver.wait(until.elementLocated(By.id('react-tabs-6')), 10000).click();
            loginData.currentPage = new ChumTab(this.driver);
            break;
        case `Galley`: return false;
            // await this.driver.wait(until.elementLocated(By.id('galleytab')), 10000).click();
            // loginData.currentPage = new GalleyTab(this.driver);
            // break;
        case `Home`: 
            await this.driver.wait(until.elementLocated(By.id('react-tabs-2')), 10000).click();
            loginData.currentPage = new HomeTab(this.driver);
            break;
        case `Login/Profile`: 
            await this.driver.wait(until.elementLocated(By.id('react-tabs-0')), 10000).click();
            loginData.currentPage = new LoginProfile(this.driver);
            break;
        case `Test`: 
            await this.driver.wait(until.elementLocated(By.id('react-tabs-4')), 10000).click();
            loginData.currentPage = new TestTab(this.driver);
            break;
        default: throw new Error(`${tabname} tab not defined.`); 
    }
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

Then('The {string} Tab is shown',{ timeout: 4000 }, async function(tabname) {
    logger(`-------------------------`);
    logger(`Is the ${tabname} tab shown?`);
    switch(tabname) {
        case `Chum`:
            const chm = await loginData.currentPage.validateField();
            assert.ok(chm);
            break;
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

Then('The form matches the following values:', {timeout: 4000 }, async function(datatable) {
    logger(`-------------------------`);
    const tableVals = processDatatable(datatable);
    const testResult = await loginData.currentPage.validateForm(tableVals);
    if (testResult !== `Pass`) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});




