const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const favoriteSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  price: { type: Number, require: true },
  owner: { type: Types.ObjectId, ref: 'User', required: true },
});

module.exports = model('Favorite', favoriteSchema);
