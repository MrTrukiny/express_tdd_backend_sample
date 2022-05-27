const mongoose = require('mongoose');
const FavoriteModel = require('../../models/Favorite.model');
const UserModel = require('../../models/User.model');
const { HTTP404Error } = require('../../shared/errors/httpErrors');

const createFavorite = async ({ ...favoriteData }) => {
  const { title, description, link, price, owner } = favoriteData;
  const newFavorite = new FavoriteModel({
    title,
    description,
    link,
    price,
    owner,
  });

  const user = await UserModel.findById(owner);
  if (!user) {
    throw new HTTP404Error('Could not find user for provided id');
  }

  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await newFavorite.save({ session });
    await user.favorites.push(newFavorite);
    await user.save({ session });
  });
  await session.endSession();

  return newFavorite;
};

module.exports = { createFavorite };
