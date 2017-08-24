/* @flow */
/* eslint-disable no-console */

import createUser from "./create-user";

import { joinExecutors } from "./utils";

export default joinExecutors({
  "create-user": createUser,
});
