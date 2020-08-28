import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import { processDatatable } from '../../Utils';
import LoginProfile from '../pages/LoginProfile';
import TemplatePage from '../pages/TemplatePage';

dotenv.config();

Before(async function () {
    // {tags: '@FCSisShown and @UserAfterLoginSeeProfile'}
  logger(`Before: Initializing webdriver for ${process.env.TEST_BROWSER}`);
  this.driver = new webdriver.Builder()
    .forBrowser(process.env.TEST_BROWSER || "chrome") // to use Firefox do .forBrowser("firefox")
    .build();
    this.currentPage = new TemplatePage();
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
    this.currentPage = new LoginProfile(this.driver);
    //assert.equal(title,'Flash Card Shark');
});

When('The user logs in as: {string}',{ timeout: 400000 }, async function(usertype) {
    //const loginPage = new LoginProfile();
    logger(`Logging in as ${usertype}`);
    this.currentPage.login(usertype);
});

Then('The {string} Tab is shown',{ timeout: 400000 }, async function(tabname) {
    logger(`Is the ${tabname} tab is shown?`);
    switch(tabname) {
        case `Login`:
            const bttw = await this.currentPage.validateField('Brave the Treacherour Waters');
            assert.ok(bttw);
            break;
        case `Profile`:
            const rank = await this.currentPage.validateField(`Profile Rank`);
            assert.ok(rank);
            break;
        default: throw new Error(`${tabname} tab not defined.`);
    }
});

Then('The following fields are available:', {timeout: 400000 }, async function(datatable) {
    const tableVals = processDatatable(datatable);
});


