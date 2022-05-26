const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const User = require('../../models/User.model');
const emailService = require('../../shared/services/email.service');

const createUser = async ({ ...userData }) => {
  const hash = await hashPassword(userData.password);
  const activationToken = generateToken(16);
  const user = { ...userData, password: hash, isActive: false, activationToken };

  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    await User.create([user], { session });
    await emailService.sendAccountActivationEmail(userData.email, activationToken);
  });

  await session.endSession();
};

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function generateToken(length) {
  return crypto.randomBytes(length).toString('hex').substring(0, length);
}

module.exports = createUser;
