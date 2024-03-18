import mongoose from "mongoose";

const mongoDB = process.env.MONGODB_URI;
const DB_NAME = "inventory";

const connectDB = async () => {
  try {
    // await mongoose.connect(`${mongoDB}/${DB_NAME}`);
    await mongoose.connect(mongoDB, { dbName: DB_NAME });
  } catch (error) {
    console.log("MongoDB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
