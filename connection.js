const knex = require("knex");
const ENV = process.env.NODE_ENV || "development";
const {
  configObj: { client, host, password, user, database, port }
} =
  ENV === "test"
    ? require("./credentials/test_credentials")
    : require("./credentials/credentials");

const config = {
  host,
  user,
  password,
  database,
  port
};

exports.connection = knex({ client, connection: config });
