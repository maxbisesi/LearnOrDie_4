import webdriver,{By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';

export default class LoginProfile {

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