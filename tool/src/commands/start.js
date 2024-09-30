const logger = require("../logger")("commands:start");

module.exports = function start(config) {
	logger.highlight(chalk.bgCyanBlue("Starting the app"));
	logger.debug(chalk.gray("Received configuration in start -"), config);
};
