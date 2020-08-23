import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';

dotenv.config();

Before({tags: '@FCSisShown'}, async function () {
  this.driver = new webdriver.Builder()
    .forBrowser(process.env.TEST_BROWSER || "chrome") // to use Firefox do .forBrowser("firefox")
    .build();
  return this.driver;
});

After({tags: '@FCSisShown'}, async function () {
  this.driver.quit();
});

When('The user navigates to FlashCardShark', async function() {
    await this.driver.get(`http://${process.env.HOST}:${process.env.PORT}`);
    const title = await this.driver.getTitle();
    await this.driver.wait(() => { return title === 'Flash Card Shark'; }, 5000);
    assert.equal(title,'Flash Card Shark');
});

Then('The {string} Tab is shown',{ timeout: 400000 }, async function(tabname) {
    await this.driver.wait(until.elementLocated(By.id('BTTW')), 10000);
    let loginButton = await this.driver.findElement(By.id('loginbutton'));
    const actions = this.driver.actions({async: true});
    await actions.move({origin:loginButton}).press().perform();
    // Performs release event on target element
    await actions.move({origin:loginButton}).release().perform();
});
