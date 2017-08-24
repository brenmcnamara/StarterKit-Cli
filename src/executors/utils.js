/* @flow */

import type { CommandArguments, CommandExecutor } from "./command-types";

// -----------------------------------------------------------------------------
//
// COMMAND ARGUMENT VALIDATION UTILS
//
// -----------------------------------------------------------------------------

export function validateNoCommands(args: CommandArguments): void {
  verify(args._.length === 0, `Unrecognized command ${args._[0]}`);
}

export function validateAtLeast1Command(args: CommandArguments): void {
  verify(args._.length > 0, "Expected another command");
}

// -----------------------------------------------------------------------------
//
// COMMAND ARGUEMNT UTILS
//
// -----------------------------------------------------------------------------

export function joinExecutors(map: {
  [commandKey: string]: CommandExecutor,
}): CommandExecutor {
  return args => {
    const allKeys = Object.keys(map);
    const topCommand = getTopCommand(args);
    const executor = map[topCommand];
    verify(
      Boolean(executor),
      // eslint-disable-next-line max-len
      `Unrecognized command ${topCommand}. Please try one of the following:\n - ${allKeys.join(
        "- "
      )}`
    );
    return executor(popTopCommand(args));
  };
}

export function getTopCommand(args: CommandArguments): string {
  return args._[0];
}

export function popTopCommand(args: CommandArguments): CommandArguments {
  validateAtLeast1Command(args);
  return { ...args, _: args._.slice(1) };
}

// -----------------------------------------------------------------------------
//
// GENERAL ERROR HANDLING
//
// -----------------------------------------------------------------------------

export function verify(condition: bool, errorMessage: string): void {
  if (!condition) {
    throw Error(errorMessage);
  }
}
