const bcrypt = require('bcrypt');
const User = require('../../models/User.model');

const createUser = async ({ ...userData }) => {
  /* return new Promise((resolve, _reject) => {
    bcrypt.hash(userData.password, 10).then((hash) => {
      const user = { ...userData, password: hash };
      User.create(user).then((response) => {
        resolve(response);
      });
    });
  }); */

  const hash = await bcrypt.hash(userData.password, 10);
  const user = { ...userData, password: hash };
  await User.create(user);
};

module.exports = createUser;
