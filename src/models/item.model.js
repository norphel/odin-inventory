import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    default: 0,
  },
});

itemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

export const Item = mongoose.model("Item", itemSchema);
