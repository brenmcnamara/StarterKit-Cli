/* @flow */

export type CommandArguments = Object;

export type CommandExecutor = CommandArguments => Promise<mixed>;
