import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connection: OK");
  } catch (error) {
    console.log("DB connection :Failed");
    console.log(error.message);
  }
};
