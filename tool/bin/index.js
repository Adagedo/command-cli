#!/usr/bin/env node
const arg = require("arg");
const chalk = require("chalk"); // adding colors to the output command
const getConfig = require("../src/config/config-mgr");
const start = require("../src/commands/start");
const logger = require("../src/logger")("bin");

try {
	const args = arg({
		"--start": Boolean,
		"--build": Boolean,
	});
	logger.debug("Received args", args);

	if (args["--start"]) {
		const config = getConfig();
		start(config);
	}
} catch (error) {
	logger.warnings(chalk.yellow(error.message));
	console.log();
	usage();
}

function usage() {
	console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greendark("--start")}\tStarts the app
  ${chalk.greendark("--build")}\tBuilds the app`);
}
