const ENV = process.env.NODE_ENV || 'development';
const {
  configObj: { host, password }
} =
  ENV === 'test'
    ? require('./credentials/test_credentials')
    : require('./credentials/credentials');
const config = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  connection: {
    database: 'postgres',
    user: 'postgres',
    port: 5432,
    host,
    password
  }
};
module.exports = config;
