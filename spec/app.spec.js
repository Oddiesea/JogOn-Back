process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const request = require('supertest');
const connection = require('../connection');

after(() => connection.destroy());
beforeEach(() => connection.seed.run());

describe('/api', () => {
  describe('/users', () => {
    describe('GET', () => {
      it('status: 200, returns an object containing an array of all users', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(({ body: { users } }) => {
            expect(users[0]).to.eql({ username: 'jimbo', user_id: 1 });
          });
      });
    });
    describe('POST', () => {
      it('status: 201, responds with an object of the new user', () => {
        return request(app)
          .post('/api/users')
          .send({ username: 'Barry365' })
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user).to.contain.keys('username', 'user_id');
          });
      });
      it('status: 400, where no username is passed', () => {
        return request(app)
          .post('/api/users')
          .send({})
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Bad request.');
          });
      });
    });
    describe('INVALID METHODS', () => {
      it('status: 405 for methods DELETE, PATCH, PUT', () => {
        const invalidMethods = ['delete', 'patch', 'put'];
        const promises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/users')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Invalid method.');
            });
        });
        return Promise.all(promises);
      });
    });
  });
});
