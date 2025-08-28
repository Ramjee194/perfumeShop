import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  reviews: [{ comment: String }],
});

export default mongoose.model("Product", productSchema);
