// import mongoose from "mongoose";

// const UpdatedResponseSchema = new mongoose.Schema(
//   {
//     delayTime: { type: Number, required: true },
//     executionTime: { type: Number, required: true },
//     image: { type: String, required: true },
//     prompt: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.UpdatedSavedImages ||
//   mongoose.model("UpdatedSavedImages", UpdatedResponseSchema);

import mongoose from "mongoose";

// Define the Image schema
const ImageSchema = new mongoose.Schema(
  {
    delayTime: { type: Number, required: true },
    executionTime: { type: Number, required: true },
    image: { type: String, required: true },
    prompt: { type: String, required: true },
  },
  { timestamps: true }
);

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, // Firebase user ID
    username: { type: String, required: true }, // Firebase username
    images: [ImageSchema], // Array of images
  },
  { timestamps: true }
);

export default mongoose.models.CloudinaryUserImages ||
  mongoose.model("CloudinaryUserImages", UserSchema);
