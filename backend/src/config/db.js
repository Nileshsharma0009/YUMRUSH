import mongoose from "mongoose";

let isConnected = false;

const ConnectDB = async () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error(" Missing MONGO_URL environment variable");
  }

  if (isConnected) {
    console.log(" MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // fail fast instead of hanging
    });

    isConnected = db.connections[0].readyState === 1;

    console.log(
      ` MongoDB connected: ${db.connections[0].host}`
    );
  } catch (error) {
    console.error(" MongoDB connection fail:", error.message);
    throw error; // important for deployment logs (Railway/Render)
  }
};

export default ConnectDB;
