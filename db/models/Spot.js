import mongoose from "mongoose";

const { Schema } = mongoose;

const spotSchema = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  mapURL: {
    type: String,
  },
  description: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },

  tags: { type: [Schema.Types.ObjectId], ref: "Tags" },

  restaurantCategory: { type: String },
  beverageCategory: { type: String },
});

const Spot = mongoose.models.Spot || mongoose.model("Spot", spotSchema);

export default Spot;
