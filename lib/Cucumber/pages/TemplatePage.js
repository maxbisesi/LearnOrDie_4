import webdriver,{By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';

export default class TemplatePage {
    pageName = 'TemplatePage';

    async validateField(field,value) {
        throw new Error(`validateField not defined on ${this.pageName}`);
    }

    async clickButton(button) {
        throw new Error(`clickButton not defined on ${this.pageName}`);
	}
	
	async fillField(field,value) {
		throw new Error(`fillField not defined on ${this.pageName}`);
	}

	async validateForm(formData={}) {
		logger(`Validating Form on Page: ${this.pageName} ...`);
		let testResult = 'Pass';
		for (const rowkey in Object.keys(formData)) {
			if (formData.hasOwnProperty(rowkey)) {
				if (await this.validateField(formData[rowkey], formData[rowkey]) === false) {
					testResult = 'Fail';
				}
			}
		}
		logger(`Validated Form. Result: ${testResult}\n`);
		return testResult;
	}
}