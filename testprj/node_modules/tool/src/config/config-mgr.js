const chalk = require("chalk");
const { comsiconfigSync } = require("cosmiconfig");
const configLoader = comsiconfigSync("tool");
const schema = require("./schema.json");
const betterAjvErrors = require("better-ajv-errors");
const Ajv = require("ajv").default; // for validation
const ajv = new Ajv({ jsonPointers: true });
const logger = require("../logger")("congig:mgr");

module.exports = function getConfig() {
	const result = configLoader.search(process.cwd());
	if (!result) {
		logger.warnings(
			chalk.yellow("could not find configuration, using defualt")
		);
		return { port: 1234 };
	} else {
		const isValid = ajv.validate(schema, result.config);
		if (!isValid) {
			logger.warnings(chalk.yello("invalid configuration"));
			console.log(betterAjvErrors(schema, result.config, ajv.errors));
			process.exit(1);
		}
		logger.debug("Found configuration", result.config);
		return result.config;
	}
};
