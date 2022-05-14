require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const connectToDb = require('../src/config/database');
const User = require('../src/models/User.model');
const { API_BASE_URL } = require('../src/shared/constants');

let dbConnection;

beforeAll(async () => {
  dbConnection = await connectToDb();
});

beforeEach(() => {
  return User.db.dropCollection('users').catch((error) => console.log(error));
});

afterAll(() => {
  dbConnection.disconnect();
});

describe('User Registration', () => {
  const validUser = {
    email: 'user1@test.com',
    password: 'T3st1234*',
  };

  const postUser = (user = validUser) => {
    return request(app).post(`${API_BASE_URL}/auth/local/signup`).send(user);
  };

  it('Returns "201 OK" when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(201);
  });

  it('Returns "User created" when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created');
  });

  it('Saves the user to database', async () => {
    await postUser();
    const userList = await User.find();
    expect(userList.length).toBe(1);
  });

  it("Saves the user's email to database", async () => {
    await postUser();
    const userList = await User.find();
    const { email } = userList[0];
    expect(email).toBe('user1@test.com');
  });

  it('Hashes the password in database', async () => {
    await postUser();
    const userList = await User.find().select('password');
    const { password } = userList[0];
    expect(password).not.toBe('T3st1234*');
  });

  it('Returns 400 when email is empty (null/undefined)', async () => {
    const response = await postUser({
      password: validUser.password,
    });
    expect(response.status).toBe(400);
  });

  it('Returns 400 when password is empty (null/undefined)', async () => {
    const response = await postUser({
      email: validUser.email,
    });
    expect(response.status).toBe(400);
  });

  it('Returns "validationErrors" property when validation error occurs', async () => {
    const response = await postUser({
      password: validUser.password,
    });
    const { body } = response;
    expect(body.validationErrors).not.toBeUndefined();
  });

  it('Returns errors for both when email and password are empty', async () => {
    const response = await postUser({
      email: null,
      password: null,
    });
    const { body } = response;
    expect(Object.keys(body.validationErrors)).toEqual(['email', 'password']);
  });

  it('Returns "Email cannot be empty" when email is empty', async () => {
    const response = await postUser({
      password: validUser.password,
    });
    const { body } = response;
    expect(body.validationErrors.email).toBe('Email cannot be empty');
  });

  it('Returns "Password cannot be empty" when password is empty', async () => {
    const response = await postUser({
      email: validUser.email,
    });
    const { body } = response;
    expect(body.validationErrors.password).toBe('Password cannot be empty');
  });
});
