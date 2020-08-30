import logger from '../logger';
export default async function Validate(webelement,expectedvalue,attribute='textContent') {
    const actual = await webelement.getAttribute(attribute);
    logger(`actual: ${actual} | expected: ${expectedvalue}`);
    if(actual === expectedvalue) {
        return true;
    }
    return false;
}