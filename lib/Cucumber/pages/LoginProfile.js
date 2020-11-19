import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';
import Validate from '../Validate';

export default class LoginProfile extends TemplatePage {
    pageName = 'LoginProfile';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
        logger(`New LoginProfile page`);
    }

    async validateField(field,value) {
        value = value.trim();
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        switch(field) {
            case `Brave the Treacherour Waters`: return await this.driver.wait(until.elementLocated(By.id('BTTW')), 10000);
            case `Profile Rank`: return await this.driver.wait(until.elementLocated(By.id('profilerank')), 10000);
            case `Username`: 
                const un = await this.driver.wait(until.elementLocated(By.id('profileusername'), 3000));
                return await Validate(un,value);
            case `Rank`:
                const profilerank = await this.driver.wait(until.elementLocated(By.id('profilerank'), 3000));
                return await Validate(profilerank,value);
            case `Points`:
                const profilepoints = await this.driver.wait(until.elementLocated(By.id('profilepoints'), 3000));
                return await Validate(profilepoints,value);
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    // loginStatus: {
	// 	currentApp: '',
	// 	loggedIn: false,
	// 	name: '',
	// 	password: '',
	// 	userid: '',
	// 	username: '',
	// 	userType: ''
	// }

    async login(usertype) {
        const usernameField = await this.driver.wait(until.elementLocated(By.id('username'), 3000));
        const passwordField = await this.driver.wait(until.elementLocated(By.id('password'), 3000));
        const loginButton = await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000));
        switch(usertype) {
            case `QATestUser`: 
                logger(`Sending credentials: us:${loginData.QATestUser.username} - pw:${loginData.QATestUser.password}`);
                await usernameField.sendKeys(`${loginData.QATestUser.username}`);
                await passwordField.sendKeys(`${loginData.QATestUser.password}`);
                await loginButton.click();
                loginData.loginStatus.loggedIn = true;
                loginData.loginStatus.username = loginData.QATestUser.username;
                loginData.loginStatus.password = loginData.QATestUser.password;
                loginData.loginStatus.user_id = loginData.QATestUser.user_id;
                return true;
            default: throw new Error(`Unknown usertype: ${usertype}`);
        }
    }

    async clickButton(buttonname) {
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case `Login`:
                const loginButton = await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000));
                await loginButton.click();
                return true;
            case `Come Aboard`: 
                const come = await this.driver.wait(until.elementLocated(By.id('comeaboard'), 3000));
                await come.click();
                return true;
            case `Choose Your Destiny`:
                await this.driver.wait(until.elementLocated(By.id('chooseyourdestiny'), 3000)).click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async fillField(field,value) {
        logger(`filling field: ${field} with value: ${value}`);
        switch(field) {
            case `username`: 
                const un = await this.driver.wait(until.elementLocated(By.id('registerusername'), 3000));
                un.sendKeys(value);
                return true;
            case `password`: 
                const pw = await this.driver.wait(until.elementLocated(By.id('registerpassword'), 3000));
                pw.sendKeys(value);
                return true;
            case `confirm`: 
                const confirm = await this.driver.wait(until.elementLocated(By.id('registerconfirm'), 3000));
                confirm.sendKeys(value);
                return true;
            case `email`: 
                const email = await this.driver.wait(until.elementLocated(By.id('registeremail'), 3000));
                email.sendKeys(value);
                return true;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
	}

}