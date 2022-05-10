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
  return User.db.dropCollection('users');
});

afterAll(() => {
  dbConnection.disconnect();
});

describe('User Registration', () => {
  const postValidUser = () => {
    return request(app).post(`${API_BASE_URL}/auth/local/signup`).send({
      email: 'user1@test.com',
      password: 'T3st1234*',
    });
  };

  it('Returns "201 OK" when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(201);
  });

  it('Returns "User created" when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User created');
  });

  it('Saves the user to database', async () => {
    await postValidUser();
    const userList = await User.find();
    expect(userList.length).toBe(1);
  });

  it("Saves the user's email to database", async () => {
    await postValidUser();
    const userList = await User.find();
    const { email } = userList[0];
    expect(email).toBe('user1@test.com');
  });

  it('Hashes the password in database', async () => {
    await postValidUser();
    const userList = await User.find().select('password');
    const { password } = userList[0];
    expect(password).not.toBe('T3st1234*');
  });
});
