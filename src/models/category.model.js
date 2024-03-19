import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

categorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

export const Category = mongoose.model("Category", categorySchema);
