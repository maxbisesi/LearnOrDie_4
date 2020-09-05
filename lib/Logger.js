import chalk from 'chalk';

const logger = (line) => {
    // console.log(chalk.italic.magenta.bgWhite(`  -> ${line}`));
    console.log(chalk.black.bgWhite(`  -> ${line}`));
    console.log(` `);
};

export default logger;