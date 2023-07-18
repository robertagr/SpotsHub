import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  mapURL: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  categories: { type: [Schema.Types.ObjectId], ref: "Category" },
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
