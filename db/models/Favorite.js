import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot",
  },
});

export default mongoose.models.Favorite ||
  mongoose.model("Favorite", FavoriteSchema);
