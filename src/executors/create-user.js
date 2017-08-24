/* @flow */
/* eslint-disable no-console */

import inquirer from "inquirer";
import isemail from "isemail";

import { validateNoCommands } from "./utils";

type UserCreate = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
};

export default async function createUser(args: Object): Promise<void> {
  validateNoCommands(args);
  const userCreate = await promptUserCreate();
  // Save the user.
  console.log(userCreate);
}

export async function promptUserCreate(): Promise<UserCreate> {
  const questions = [
    {
      type: "input",
      name: "email",
      message: "Email:",
      validate: validateEmail,
    },
    {
      type: "input",
      name: "password",
      mask: "*",
      message: "Password:",
      validate: validatePassword,
    },
    {
      type: "input",
      name: "firstName",
      message: "First Name:",
      validate: validateStringNotEmpty,
    },
    {
      type: "input",
      name: "lastName",
      message: "Last Name:",
      validate: validateStringNotEmpty,
    },
  ];

  return await inquirer.prompt(questions);
}

const validateStringNotEmpty = (str: string) =>
  str.length > 0 ? true : "Must have at least 1 character";

const validateEmail = (email: string) =>
  isemail.validate(email) ? true : "Invalid email address";

const validatePassword = (password: string) =>
  password.length > 6 ? true : "Password must be at least 6 characters";
