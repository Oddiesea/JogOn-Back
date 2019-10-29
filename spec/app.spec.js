process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const request = require('supertest');
const connection = require('../connection');

after(() => connection.destroy());
beforeEach(function() {
  this.timeout(10000);
  return connection.seed.run();
});

describe('/api', () => {
  describe('/users', () => {
    describe('GET', () => {
      it('status: 200, responds with an object containing an array of all users', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(({ body: { users } }) => {
            expect(users.length).to.equal(6);
            expect(users[0]).to.contain.keys('username', 'user_id');
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
  describe('/flags', () => {
    describe('GET', () => {
      it('status: 200, responds with an object containing an array of all flags', () => {
        return request(app)
          .get('/api/flags')
          .expect(200)
          .then(({ body: { flags } }) => {
            expect(flags.length).to.equal(4);
            expect(flags[0]).to.contain.keys(
              'flag_id',
              'longitude',
              'latitude',
              'user_id',
              'flag_type_id',
              'created_at'
            );
          });
      });
    });
    describe('POST', () => {
      it('status: 201, responds with an object of the new flag', () => {
        return request(app)
          .post('/api/flags')
          .send({
            latitude: 66.66,
            longitude: 77.77,
            user_id: 1,
            flag_type_id: 1
          })
          .expect(201)
          .then(({ body: { flag } }) => {
            expect(flag).to.contain.keys(
              'flag_id',
              'longitude',
              'latitude',
              'user_id',
              'flag_type_id',
              'created_at'
            );
            expect(flag.longitude).to.equal(77.77);
          });
      });
      it('status: 400, where flag object is missing info', () => {
        return request(app)
          .post('/api/flags')
          .send({
            latitude: 66.66,
            user_id: 1,
            flag_type_id: 1
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Bad request.');
          });
      });
      it('status: 400, where flag object contains invalid info', () => {
        return request(app)
          .post('/api/flags')
          .send({
            latitude: 66.66,
            longitude: 'HELLO!!',
            user_id: 1,
            flag_type_id: 1
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Bad request.');
          });
      });
      it('status: 422, where flag object contains a non-existent user_id', () => {
        return request(app)
          .post('/api/flags')
          .send({
            latitude: 66.66,
            longitude: 77.77,
            user_id: 999,
            flag_type_id: 1
          })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Unprocessable entity.');
          });
      });
      it('status: 422, where flag object contains a non-existent flag_type_id', () => {
        return request(app)
          .post('/api/flags')
          .send({
            latitude: 66.66,
            longitude: 77.77,
            user_id: 1,
            flag_type_id: 999
          })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Unprocessable entity.');
          });
      });
    });
  });
});
