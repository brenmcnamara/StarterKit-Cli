/* @flow */
/* eslint-disable no-console */

import chalk from "chalk";
import minimist from "minimist";
import rootExecutor from "./executors";

rootExecutor(minimist(process.argv.slice(2)))
  .then(() => process.exit(0))
  .catch(error => {
    console.error(chalk.red(error.toString()));
    process.exit(1);
  });
