import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver from 'selenium-webdriver';
import assert from 'assert';

dotenv.config();

Before({tags: '@UserAfterLoginSeeProfile'}, async function () {
  this.driver = new webdriver.Builder()
    .forBrowser("chrome")
    .build();
  return this.driver;
});

After({tags: '@UserAfterLoginSeeProfile'}, async function () {
  this.driver.quit();
});

When('The user navigates to FlashCardShark', async function() {
    return await this.driver.get(`http://${process.env.HOST}:${process.env.PORT}`);
});

Then('The App is shown', async function() {
    const title = await this.driver.getTitle();
    assert.equal(title,'Flash Card Shark');
});