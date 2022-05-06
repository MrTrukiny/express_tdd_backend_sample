const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User.model');

beforeEach(() => {
  return User.db.dropCollection('users');
});

describe('User Registration', () => {
  it('Returns "201 OK" when signup request is valid', (done) => {
    request(app)
      .post('/api/v1.0/auth/local/signup')
      .send({
        email: 'user1@test.com',
        password: 'T3st1234*',
      })
      .expect(201, done);
  });

  it('Returns "Success" when signup request is valid', (done) => {
    request(app)
      .post('/api/v1.0/auth/local/signup')
      .send({
        email: 'user2@test.com',
        password: 'T3st1234*',
      })
      .then((response) => {
        expect(response.body.message).toBe('Success');
        done();
      });
  });

  it('Saves the user to database', (done) => {
    request(app)
      .post('/api/v1.0/auth/local/signup')
      .send({
        email: 'user1@test.com',
        password: 'T3st1234*',
      })
      .then(() => {
        User.find().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });
});
