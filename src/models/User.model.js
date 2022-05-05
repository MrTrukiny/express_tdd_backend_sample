const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      // eslint-disable-next-line object-shorthand
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }

          return false;
        }

        return true;
      },
      message: 'The specified email address is already in use.',
    },
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    required: [true, 'User email required.'],
    unique: true,
  },
  password: { type: String, required: true, minlength: 6, select: false },
});

module.exports = model('User', userSchema);
