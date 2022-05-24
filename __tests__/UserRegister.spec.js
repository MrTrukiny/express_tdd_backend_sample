require('dotenv').config();
const request = require('supertest');
const { interactsWithMail } = require('nodemailer-stub');

const app = require('../src/app');
const connectToDb = require('../src/config/database');
const User = require('../src/models/User.model');
const { API_BASE_URL } = require('../src/shared/constants');
const emailService = require('../src/shared/services/email.service');

let dbConnection;

beforeAll(async () => {
  dbConnection = await connectToDb();
});

beforeEach(async () => {
  await User.deleteMany();
});

afterAll(() => {
  dbConnection.disconnect();
});

const validUser = {
  email: 'user1@test.com',
  password: 'T3st1234*',
};

const postUser = (user = validUser) => {
  return request(app).post(`${API_BASE_URL}/auth/local/signup`).send(user);
};

describe('User Registration', () => {
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

  it.each`
    field         | expectedMessage
    ${'email'}    | ${'Email cannot be empty'}
    ${'password'} | ${'Password cannot be empty'}
  `(
    'Returns $expectedMessage when $field is empty',
    async ({ field, expectedMessage }) => {
      const user = {
        email: validUser.email,
        password: validUser.password,
      };
      user[field] = null;
      const response = await postUser(user);
      const { body } = response;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    },
  );

  it('Creates user in inactive mode', async () => {
    await postUser();
    const users = await User.find();
    const savedUser = users[0];
    expect(savedUser.isActive).toBe(false);
  });

  it('Creates user in inactive mode even when the request body contains "isActive" as true', async () => {
    const newUser = { ...validUser, isActive: true };
    await postUser(newUser);
    const users = await User.find();
    const savedUser = users[0];
    expect(savedUser.isActive).toBe(false);
  });

  it('Creates an activationToken for user', async () => {
    await postUser();
    const users = await User.find();
    const savedUser = users[0];
    expect(savedUser.activationToken).toBeTruthy();
  });

  it('Sends an "Account activation email" with activationToken', async () => {
    await postUser();
    const lastMail = interactsWithMail.lastMail();
    expect(lastMail.to[0]).toBe(validUser.email);
    const users = await User.find();
    const savedUser = users[0];
    expect(lastMail.content).toContain(savedUser.activationToken);
  });

  it('Returns "502 Bad Gateway" when sending email fails', async () => {
    const mockSendAccountActivationEmail = jest
      .spyOn(emailService, 'sendAccountActivationEmail')
      .mockRejectedValue({ message: 'Failed to deliver email' });
    const response = await postUser();
    mockSendAccountActivationEmail.mockRestore();
    expect(response.status).toBe(502);
  });

  it('Returns "Email failure" message when sending email fails', async () => {
    const mockSendAccountActivationEmail = jest
      .spyOn(emailService, 'sendAccountActivationEmail')
      .mockRejectedValue({ message: 'Failed to deliver email' });
    const response = await postUser();
    mockSendAccountActivationEmail.mockRestore();
    expect(response.body.message).toBe('Email failure');
  });

  it('Does not save user to database if activation email fails', async () => {
    const mockSendAccountActivationEmail = jest
      .spyOn(emailService, 'sendAccountActivationEmail')
      .mockRejectedValue({ message: 'Failed to deliver email' });
    await postUser();
    mockSendAccountActivationEmail.mockRestore();
    const users = await User.find();
    expect(users.length).toBe(0);
  });
});

describe('User Activation', () => {
  const postActivateUser = (token) => {
    return request(app).post(`${API_BASE_URL}/auth/local/activate/${token}`).send();
  };

  it('Activates the User account when correct token is sent', async () => {
    await postUser();
    let users = await User.find();
    const token = users[0].activationToken;

    await postActivateUser(token);

    users = await User.find();
    expect(users[0].isActive).toBe(true);
  });
});
