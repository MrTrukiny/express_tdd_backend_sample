const User = require('../../models/User.model');

async function activateUser({ token }) {
  const user = await User.findOne({ activationToken: token });

  if (!user) {
    throw new Error('Invalid token');
  }

  user.isActive = true;
  user.activationToken = null;
  await user.save();
}

module.exports = activateUser;
