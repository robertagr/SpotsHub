import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  },
  spotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot",
  },
});

export default mongoose.models.Favorite ||
  mongoose.model("Favorite", FavoriteSchema);
