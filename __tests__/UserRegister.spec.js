const request = require('supertest');
const app = require('../src/app');
const connectToDb = require('../src/config/database');
const User = require('../src/models/User.model');

let dbConnection;

beforeAll(async () => {
  dbConnection = await connectToDb();
});

beforeEach(() => {
  return User.db.dropCollection('users');
});

afterAll(() => {
  dbConnection.disconnect();
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

  it('Returns "User created" when signup request is valid', (done) => {
    request(app)
      .post('/api/v1.0/auth/local/signup')
      .send({
        email: 'user1@test.com',
        password: 'T3st1234*',
      })
      .then((response) => {
        expect(response.body.message).toBe('User created');
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

  it("Saves the user's email to database", (done) => {
    request(app)
      .post('/api/v1.0/auth/local/signup')
      .send({
        email: 'user1@test.com',
        password: 'T3st1234*',
      })
      .then(() => {
        User.find().then((userList) => {
          const { email } = userList[0];
          expect(email).toBe('user1@test.com');
          done();
        });
      });
  });

  it('Hashes the password in database', (done) => {
    request(app)
      .post('/api/v1.0/auth/local/signup')
      .send({
        email: 'user1@test.com',
        password: 'T3st1234*',
      })
      .then(() => {
        User.find()
          .select('password')
          .then((userList) => {
            const { password } = userList[0];
            expect(password).not.toBe('T3st1234*');
            done();
          });
      });
  });
});
