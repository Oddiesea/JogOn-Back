const ENV = process.env.NODE_ENV || 'development';

// TEST DATA
const usersTest = require('./users_test');
const flagsTest = require('./flags_test');
const flag_typesTest = require('./flag_types_test');
const routesTest = require('./routes_test');
const junctionsTest = require('./junctions_test');

// DEV DATA
const users = require('./users');
const flags = require('./flags');
const flag_types = require('./flag_types');
const routes = require('./routes');
const junctions = require('./junctions');

const data = {
  users,
  flags,
  flag_types,
  routes,
  junctions
};

const testData = {
  users: usersTest,
  flags: flagsTest,
  flag_types: flag_typesTest,
  routes: routesTest,
  junctions: junctionsTest
};

module.exports = ENV === 'test' ? testData : data;
