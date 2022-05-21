const { createUser } = require('../services');

const postUser = async (req, res) => {
  try {
    const { body } = req;
    await createUser({ ...body });
    return res.status(201).send({ message: 'User created' });
  } catch (error) {
    // eslint-disable-next-line no-warning-comments
    // TODO: log errors
    console.log('postUser.controller: ', error);
    return res.status(502).send({ message: 'Email failure' });
  }
};

module.exports = postUser;
