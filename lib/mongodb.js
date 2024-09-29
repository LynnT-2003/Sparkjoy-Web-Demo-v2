import mongoose from "mongoose";

const connectMongoDB = async () => {
  // Check the connection state: 0 = disconnected, 1 = connected
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connectMongoDB;
