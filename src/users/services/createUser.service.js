const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const User = require('../../models/User.model');
const emailService = require('../../shared/services/email.service');

const createUser = async ({ ...userData }) => {
  const hash = await hashPassword(userData.password);
  const activationToken = generateToken(16);
  const user = { ...userData, password: hash, isActive: false, activationToken };

  // Does not create user if email sending fails. This would be an approach without using MongoDb transactions.
  /* const createdUser = await User.create(user);
  try {
    await emailService.sendAccountActivationEmail(userData.email, activationToken);
  } catch (error) {
    await User.findByIdAndDelete(createdUser._id);
    throw new Error(
      'Failed sending account activation message, user not created. Try again later.',
    );
  } */
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
