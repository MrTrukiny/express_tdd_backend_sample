const request = require('supertest');
const app = require('../src/app');

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
      email: 'user1@test.com',
      password: 'T3st1234*',
    })
    .then((response) => {
      expect(response.body.message).toBe('Success');
      done();
    });
});
