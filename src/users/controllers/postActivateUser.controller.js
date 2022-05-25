const { activateUser } = require('../services');

async function postActivateUser(req, res) {
  try {
    const { token } = req.params;
    await activateUser({ token });
    return res.status(200).json({ message: 'User activated' });
  } catch (error) {
    // eslint-disable-next-line no-warning-comments
    // TODO: log errors
    console.log('postActivateUser.controller: ', error);
    return res.status(400).send({ message: 'User activation failed' });
  }
}

module.exports = postActivateUser;
