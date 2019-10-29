process.env.NODE_ENV = 'test';
const connection = require('../../connection');
console.log(connection.schema);
connection.schema.createTable('test', testTable => {
  testTable.string('slug').primary();
});
