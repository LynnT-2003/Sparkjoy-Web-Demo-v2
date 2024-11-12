import mongoose from "mongoose";

// Image schema
const ImageSchema = new mongoose.Schema(
  {
    delayTime: { type: Number, required: true },
    executionTime: { type: Number, required: true },
    imageUrl: { type: String, required: true }, // Store only the URL of the image
    prompt: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the Image model
const Image = mongoose.model("Image", ImageSchema);

// User schema with a reference to Image documents
const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }], // Array of references to Image
  },
  { timestamps: true }
);

// Export User model as CloudinaryUserImages, using the format you specified
export default mongoose.models.CloudinaryUserImages ||
  mongoose.model("CloudinaryUserImages", UserSchema);
