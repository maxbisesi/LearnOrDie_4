import chalk from 'chalk';

const logger = (line) => {
    console.log(chalk.italic.magenta.bgWhite(`  ->${line}`));
}

export default logger;