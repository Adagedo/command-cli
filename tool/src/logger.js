const chalk = require("chalk");
const debug = require("debug");

const createLogger = (name) => {
	return {
		log: (...args) => console.log(chalk.gray(...args)),
		warnings: (...args) => console.log(chalk.yellow(...args)),
		highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
		debug: debug(name),
	};
};

module.exports = createLogger;
