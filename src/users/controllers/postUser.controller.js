const { createUser } = require('../services');

const postUser = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  if (!email && !password) {
    return res.status(400).send({
      validationErrors: {
        email: 'Email cannot be empty',
        password: 'Password cannot be empty',
      },
    });
  }

  if (!email) {
    return res.status(400).send({ validationErrors: { email: 'Email cannot be empty' } });
  }

  if (!password) {
    return res
      .status(400)
      .send({ validationErrors: { password: 'Password cannot be empty' } });
  }

  await createUser({ ...body });
  return res.status(201).send({ message: 'User created' });
};

module.exports = postUser;
