import mongoose from "mongoose";

const { Schema } = mongoose;

const spotSchema = new Schema({
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

const Spot = mongoose.models.Spot || mongoose.model("Spot", spotSchema);

export default Spot;
