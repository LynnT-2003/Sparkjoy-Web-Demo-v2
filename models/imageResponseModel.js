import mongoose from "mongoose";

const UpdatedResponseSchema = new mongoose.Schema(
  {
    delayTime: { type: Number, required: true },
    executionTime: { type: Number, required: true },
    image: { type: String, required: true },
    prompt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.UpdatedSavedImages ||
  mongoose.model("UpdatedSavedImages", UpdatedResponseSchema);
