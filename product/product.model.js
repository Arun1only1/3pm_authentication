import mongoose from "mongoose";

// set rule/schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 55,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sellerId: {
    type: mongoose.ObjectId, // mongoose.Schema.Types.ObjectId
    required: true,
    ref: "User",
  },
});

// create table(model)
export const Product = mongoose.model("Product", productSchema);
