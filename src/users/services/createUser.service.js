const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const UserModel = require('../../models/User.model');
const emailService = require('../../shared/services/email.service');

const createUser = async ({ ...userData }) => {
  const { email, password } = userData;
  const hashedPassword = await hashPassword(password);
  const activationToken = generateToken(16);

  const user = new UserModel({
    email,
    password: hashedPassword,
    isActive: false,
    activationToken,
  });

  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await user.save({ session });
    await emailService.sendAccountActivationEmail(email, activationToken);
  });
  await session.endSession();

  return user;
};

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function generateToken(length) {
  return crypto.randomBytes(length).toString('hex').substring(0, length);
}

module.exports = createUser;
