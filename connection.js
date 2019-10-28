const knex = require("knex");
const {
  configObj: { client, host, password, user, database, port }
} = require("./credentials");

const config = {
  host,
  user,
  password,
  database,
  port
};

console.log(config)

exports.connection = knex({ client, connection: config });
