import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server connected to MongoDB - ${conn.connection.host}`);
  } catch (err) {
    console.log(`Server MongoDB Error - ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
