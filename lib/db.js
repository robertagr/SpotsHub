import { connectMongo } from "./mongoose";
import User from "../src/utils/database/User.js";
import Favorite from "../src/utils/database/Favorite.js";

export async function getAllUsers() {
  await connectMongo();

  return User.find({ isActive: true });
}

export async function getFavoritesByUserId(userId) {
  //   await connectMongo();

  return Favorite.find({ userId }).populate("spotId").exec();
}

export async function isSpotFavorite(userId, spotId) {
  const favorite = await Favorite.findOne({
    userId,
    spotId,
  });

  // console.log('FAVORITEEEEEE:',!!favorite);
  return !!favorite;
}

export async function addFavorite(userId, spotId) {
  const newFav = new Favorite({
    userId,
    spotId,
  });

  await newFav.save();
}

// export async function removeFavorite(userId, spotId) {
//     Favorite.findByIdAndDelete({
//         userId,
//         spotId
//     })
// }

export async function removeFavorite(favoriteId) {
  await Favorite.findByIdAndDelete(favoriteId);
}

export async function toggleFavorite(userId, spotId) {
  if (isSpotFavorite(userId, spotId)) {
    // console.log('hello------------------------------');
    addFavorite(userId, spotId);
  } else {
    // console.log('false============================');

    removeFavorite(userId, spotId);
  }
}
