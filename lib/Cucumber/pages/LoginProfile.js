import webdriver,{By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';

export default class LoginProfile extends TemplatePage {
    pageName = 'LoginProfile';
    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
    }
    async validateField(field,value) {
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        switch(field) {
            case `Brave the Treacherour Waters`: return await this.driver.wait(until.elementLocated(By.id('BTTW')), 10000);
            case `Chat Module`: return await this.driver.wait(until.elementLocated(By.id('chatmod')), 10000);
            case `Draw Tab`: return await this.driver.wait(until.elementLocated(By.id('drawtab')), 10000);
            case `Math Module`: return await this.driver.wait(until.elementLocated(By.id('mathmod')), 10000);
            case `Profile Rank`: return await this.driver.wait(until.elementLocated(By.id('profilerank')), 10000);
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
        
    }

    async login(usertype) {
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
    }

    async registerUser() {

    }


}