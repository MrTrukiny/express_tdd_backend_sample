const User = require('../../models/User.model');
const { HTTP400Error } = require('../../shared/errors/httpErrors');

async function activateUser({ token }) {
  const user = await User.findOne({ activationToken: token });

  if (!user) {
    throw new HTTP400Error('Invalid token, try again');
  }

  user.isActive = true;
  user.activationToken = null;
  await user.save();
}

module.exports = activateUser;
