import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import Utils from '../../Utils';
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
  logger(`Testing complete.`);
  this.driver.quit();
});

When('The user navigates to FlashCardShark',{ timeout: 4000 }, async function() {
    logger(`-------------------------`);
    logger(`The user navigates to FlashCardShark`);
    logger(`==========================`);
    await this.driver.get(`http://${process.env.HOST}:${process.env.PORT}`);
    const title = await this.driver.getTitle();
    await this.driver.wait(() => { return title === 'Flash Card Shark'; }, 5000);
    loginData.currentPage = new LoginProfile(this.driver);
    //logger(`On the App, first page object is: ${JSON.stringify(loginData.currentPage)}`);
    await this.driver.sleep(this.waitTime);
});

When('The user logs in as: {string}',{ timeout: 4000 }, async function(usertype) {
    logger(`-------------------------`);
    logger(`The user logs in as: ${usertype}`);
    logger(`==========================`);
    await loginData.currentPage.login(usertype);
    await this.driver.sleep(this.waitTime);
});

When('The user uses the app as a Guest', { timeout: 4000 }, async function() {
    logger(`-------------------------`);
    logger(`The user uses the app as a Guest`);
    logger(`==========================`);
    loginData.loginStatus.loggedIn = false;
    loginData.loginStatus.username = 'GUESTUSER';
    loginData.loginStatus.password = 'GUESTUSER';
});

When(`The user selects {string} checkbox`, { timeout: 4000 }, async function(checkbox) {
    logger(`-------------------------`);
    logger(`The user selects ${checkbox} checkbox`);
    logger(`==========================`);
    await loginData.currentPage.selectCheckBox(checkbox);
});


When('The user clicks the {string} button',{timeout:4000}, async function(buttonname) {
    logger(`-------------------------`);
    logger(`The user clicks the ${buttonname} button`);
    logger(`==========================`);
    await loginData.currentPage.clickButton(buttonname);
    await this.driver.sleep(this.waitTime);
});

When('The user fills the form with the following values:',{timeout:4000}, async function(vals) {
    logger(`-------------------------`);
    logger(`The user fills the form with the following values`);
    logger(`===========================`);
    let table = Utils.processDatatable(vals);
    const fillres = await loginData.currentPage.fillForm(table);
    if(fillres !== true) { 
        logger(`Result: ${JSON.stringify(fillres)}`);
        throw new Error(`Error filling form on page ${loginData.currentPage.pageName}`);
    }
});

When('The user switches to the {string} Tab',{ timeout: 4000 }, async function(tabname) {
    logger(`-------------------------`);
    logger(`The user switches to the ${tabname} Tab`);
    logger(`==========================`);
    switch(tabname) {
        case `Chum`: 
            await this.driver.wait(until.elementLocated(By.id('react-tabs-6')), 10000).click();
            loginData.currentPage = new ChumTab(this.driver);
            break;
        case `Galley`:
            await this.driver.wait(until.elementLocated(By.id('react-tabs-8')), 10000).click();
            loginData.currentPage = new GalleyTab(this.driver);
            break;
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
});

Then('The {string} Tab is shown',{ timeout: 4000 }, async function(tabname) {
    logger(`-------------------------`);
    logger(`The ${tabname} Tab is shown`);
    logger(`==========================`);
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
});

Then('The form matches the following values:', {timeout: 4000 }, async function(datatable) {
    logger(`-------------------------`);
    logger(`The form matches the following values:`);
    logger(`==========================`);
    const tableVals = Utils.processDatatable(datatable);
    const testResult = await loginData.currentPage.validateForm(tableVals);
    if (testResult !== true) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
});




