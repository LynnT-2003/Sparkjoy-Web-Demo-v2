import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
    delayTime: { type: Number, required: true },
    executionTime: { type: Number, required: true },
    images: { type: [String], required: true }, // Array of strings for images
    info: { type: String, required: true }, // String for info
  },
  { timestamps: true }
);

export default mongoose.models.Response ||
  mongoose.model("Response", ResponseSchema);
