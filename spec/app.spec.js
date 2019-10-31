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
            expect(flags.length).to.equal(5);
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
      describe('QUERIES', () => {
        it('accepts a query of ?min_lat=**&max_lat=**&min_long=**&max_long=**', () => {
          return request(app)
            .get('/api/flags?min_lat=53&max_lat=54&min_long=-1.6&max_long=-1.5')
            .expect(200)
            .then(({ body: { flags } }) => {
              expect(flags.length).to.equal(4);
            });
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
    describe('INVALID METHODS', () => {
      it('status: 405 for methods DELETE, PATCH, PUT', () => {
        const invalidMethods = ['delete', 'patch', 'put'];
        const promises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/flags')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Invalid method.');
            });
        });
        return Promise.all(promises);
      });
    });
  });
  describe('/flag_types', () => {
    describe('GET', () => {
      it('status: 200, responds with an object containing an array of all flag types', () => {
        return request(app)
          .get('/api/flag_types')
          .expect(200)
          .then(({ body: { flagTypes } }) => {
            expect(flagTypes.length).to.equal(4);
            expect(flagTypes[0]).to.contain.keys('flag_type_id', 'flag_type');
          });
      });
    });
    describe('POST', () => {
      it('status: 201, responds with an object of the new flag type', () => {
        return request(app)
          .post('/api/flag_types')
          .send({
            flag_type: 'angry dogs'
          })
          .expect(201)
          .then(({ body: { flagType } }) => {
            expect(flagType).to.contain.keys('flag_type', 'flag_type_id');
            expect(flagType.flag_type).to.equal('angry dogs');
          });
      });
      it('status: 400, where flagType object is missing info', () => {
        return request(app)
          .post('/api/flag_types')
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
            [method]('/api/flag_types')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Invalid method.');
            });
        });
        return Promise.all(promises);
      });
    });
  });
  describe('/routes', () => {
    describe('GET', () => {
      it('status: 200, responds with an object containing an array of all routes', () => {
        return request(app)
          .get('/api/routes')
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes.length).to.equal(4);
            expect(routes[0]).to.contain.keys(
              'route_id',
              'poly',
              'length_in_km',
              'user_id',
              'created_at'
            );
          });
      });
      describe('QUERIES', () => {
        it('accepts a query of ?latitude=**&longitude=**', () => {
          return request(app)
            .get('/api/routes?latitude=20.1&longitude=2')
            .expect(200)
            .then(({ body: { routes } }) => {
              expect(routes.length).to.equal(1);
            });
        });
      });
    });
    describe('POST', () => {
      it('status: 201, responds with an object of the new route', () => {
        return request(app)
          .post('/api/routes')
          .send({
            poly: 'fyg638uedhwjcyuucu6786732y8732uhdncbyghu',
            length_in_km: 9.2,
            user_id: 1,
            latitude: 1.1,
            longitude: 2.2,
            latitudeDelta: 1.1,
            longitudeDelta: 2.2
          })
          .expect(201)
          .then(({ body: { route } }) => {
            expect(route).to.contain.keys(
              'route_id',
              'poly',
              'length_in_km',
              'user_id',
              'created_at',
              'max_lat',
              'min_lat',
              'min_long',
              'max_long'
            );
            expect(route.length_in_km).to.equal(9.2);
          });
      });
      it('status: 400, where route object is missing info', () => {
        return request(app)
          .post('/api/routes')
          .send({
            length_in_km: 9.2,
            user_id: 1
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Bad request.');
          });
      });
      it('status: 400, where route object contains invalid info', () => {
        return request(app)
          .post('/api/routes')
          .send({
            poly: 'fyg638uedhwjcyuucu6786732y8732uhdncbyghu',
            length_in_km: 'HELLO!!',
            user_id: 1,
            latitude: 1.1,
            longitude: 2.2,
            latitudeDelta: 1.1,
            longitudeDelta: 2.2
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Bad request.');
          });
      });
      it('status: 422, where route object contains a non-existent user_id', () => {
        return request(app)
          .post('/api/routes')
          .send({
            poly: 'fyg638uedhwjcyuucu6786732y8732uhdncbyghu',
            length_in_km: 9.2,
            user_id: 999,
            latitude: 1.1,
            longitude: 2.2,
            latitudeDelta: 1.1,
            longitudeDelta: 2.2
          })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Unprocessable entity.');
          });
      });
    });
    describe('INVALID METHODS', () => {
      it('status: 405 for methods DELETE, PATCH, PUT', () => {
        const invalidMethods = ['delete', 'patch', 'put'];
        const promises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/routes')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Invalid method.');
            });
        });
        return Promise.all(promises);
      });
    });
  });
  describe('/junctions', () => {
    describe('GET', () => {
      it('status: 200, responds with an object containing an array of all junctions', () => {
        return request(app)
          .get('/api/junctions')
          .expect(200)
          .then(({ body: { junctions } }) => {
            expect(junctions.length).to.equal(1);
          });
      });
    });
    describe('POST', () => {
      it('status: 201, responds with an object containing an array of the new junctions', () => {
        return request(app)
          .post('/api/junctions')
          .send({
            junctions: [
              { flag_id: 1, route_id: 1 },
              { flag_id: 2, route_id: 2 }
            ]
          })
          .expect(201)
          .then(({ body: { junctions } }) => {
            expect(junctions.length).to.equal(2);
            expect(junctions[1]).to.contain.keys('junction_id');
          });
      });
    });
  });
});
