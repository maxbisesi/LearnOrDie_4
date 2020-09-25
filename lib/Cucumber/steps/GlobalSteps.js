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
import apiManager from '../apiManager';

dotenv.config();
const AXIOSCONFIG = {'baseURL':`http://${process.env.HOST}:${process.env.PORT}`, 'validateStatus': (status) => {return true;}};

Before(async function () {
    // {tags: '@FCSisShown and @UserAfterLoginSeeProfile'}
  logger(`Before: Initializing webdriver for ${process.env.TEST_BROWSER}`);

    this.driver = new webdriver.Builder()
        .forBrowser(process.env.TEST_BROWSER || "chrome") // to use Firefox do .forBrowser("firefox")
        .build();
    this.waitTime = 1000;
    return this.driver;
});

After(async function (scenario) {
  // {tags: '@FCSisShown and @UserAfterLoginSeeProfile'}
  logger(`Testing complete.`);
  // logger(`${JSON.stringify(scenario)}`);
  if (scenario.result.status === "failed") {
    logger(`Test failed`);
    await this.driver.sleep(50000);
   } else {
    this.driver.quit();
   }
});

When('The user navigates to FlashCardShark',{ timeout: 4000 }, async function() {
    logger(`The user navigates to FlashCardShark`);
    await this.driver.get(`http://${process.env.HOST}:${process.env.PORT}`);
    // go fullscreen
    //await this.driver.manage().window().fullscreen();
    await this.driver.manage().window().maximize();
    const title = await this.driver.getTitle();
    await this.driver.wait(() => { return title === 'Flash Card Shark'; }, 5000);
    loginData.currentPage = new LoginProfile(this.driver);
    //logger(`On the App, first page object is: ${JSON.stringify(loginData.currentPage)}`);
    await this.driver.sleep(this.waitTime);
});

When('The user logs in as: {string}',{ timeout: 4000 }, async function(usertype) {
    logger(`The user logs in as: ${usertype}`);
    await loginData.currentPage.login(usertype);
    await this.driver.sleep(this.waitTime);
});

When('The user uses the app as a Guest', { timeout: 4000 }, async function() {
    logger(`The user uses the app as a Guest`);
    loginData.loginStatus.loggedIn = false;
    loginData.loginStatus.username = 'GUESTUSER';
    loginData.loginStatus.password = 'GUESTUSER';
});

When(`The user selects {string} checkbox`, { timeout: 4000 }, async function(checkbox) {
    logger(`The user selects ${checkbox} checkbox`);
    await loginData.currentPage.selectCheckBox(checkbox);
});


When('The user clicks the {string} button',{timeout:4000}, async function(buttonname) {
    logger(`The user clicks the ${buttonname} button`);
    await loginData.currentPage.clickButton(buttonname);
    await this.driver.sleep(this.waitTime);
});

When('The user clicks the {string} button {int} times', { timeout: 8000 }, async function(buttonname,times) {
    logger(`The user clicks the ${buttonname} button ${times} times.`);
    for( let i = 0; i<times; i++) {
        logger(`    ... clicking the ${buttonname} button the ${times} time.`);
        await loginData.currentPage.clickButton(buttonname);
    }
    await this.driver.sleep(this.waitTime);
});

When('The user fills the form with the following values:',{timeout:4000}, async function(vals) {
    logger(`The user fills the form with the following values`);
    let table = Utils.processDatatable(vals);
    const fillres = await loginData.currentPage.fillForm(table);
    if(fillres !== true) { 
        logger(`Result: ${JSON.stringify(fillres)}`);
        throw new Error(`Error filling form on page ${loginData.currentPage.pageName}`);
    }
});

When('The user switches to the {string} Tab',{ timeout: 4000 }, async function(tabname) {
    logger(`The user switches to the ${tabname} Tab`);
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

When('The user waits {string} seconds',{ timeout: 60000 }, async function(seconds) {
    logger('Waiting ' + seconds + ' seconds...');
    await this.driver.sleep(seconds * 1000);
    logger('Waited ' + seconds + ' seconds\n');
});

When('The user exits the test', { timeout: 60000 }, async function() {
    logger('Exiting test...');
    throw new Error(`Exiting the test for debugging!`);
});

When('The user queries for a FlashCard with the following properties:',{ timeout: 60000 }, async function(rawtable) {
    logger('The user queries for a FlashCard with the following properties:');
    const table = rawtable[`rawTable`];
    logger(table);
    table.shift();
    let queryList = [];
    for( let i = 0; i < table.length; i++) {
        queryList.push({ 'Field':`${table[i][0]}`, 
                         'Operator':`${table[i][1]}`,
                         'Value': `${table[i][2]}`});
    }
    await apiManager.queryForFlashCard(queryList);
});

Then('The {string} Tab is shown',{ timeout: 4000 }, async function(tabname) {
    logger(`The ${tabname} Tab is shown`);
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
    logger(`The form matches the following values:`);
    const tableVals = Utils.processDatatable(datatable);
    const testResult = await loginData.currentPage.validateForm(tableVals);
    if (testResult !== true) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
});

Then('The {string} field value is one of the following:',{timeout: 4000 }, async function(field,rawtable) {
    logger(`The ${field} field value is one of the following:`);
    let vals = rawtable['rawTable'];
    let result = false;
    vals.shift();
    for(let v = 0; v<vals.length; v++) {
        logger(`    ${vals[v]} in ${field} ?`);
        if(`${vals[v]}` === 'randomCategory') {
            logger(`random category: ${Utils.randomData.randomCategory}`);
            vals[v] = Utils.randomData.randomCategory;
        }
        result = await loginData.currentPage.validateField(field,vals[v]);
        if(result === true) {
            logger(`    Found ${vals[v]} in ${field}`);
            break;
        }
    }
    if(result === false) {
        throw new Error(`Couldn't find the field value in one of the listed values.`);
    }
});

Then(`The {string} alert message is shown`, { timeout: 7000 }, async function(messege) {
    logger(`The ${messege} alert message is shown`);
    await this.driver.wait(until.alertIsPresent(), 7000);
    // Store the alert in a variable
    let alert = await this.driver.switchTo().alert();
    //Store the alert text in a variable
    let alertText = await alert.getText();
    logger(`    ... Alert text: ${alertText}`);
    if(alertText === messege) {
        logger(`    ...Messages match`);
        await alert.accept();
    } else {
        throw new Error(`The alert messege doesn't match: ${alertText} ${messege}`);
    }
});




