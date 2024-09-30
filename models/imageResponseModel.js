import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
    delayTime: { type: Number, required: true },
    executionTime: { type: Number, required: true },
    images: { type: [String], required: true },
    info: { type: String, required: true },
    prompt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.SavedImages ||
  mongoose.model("SavedImages", ResponseSchema);
