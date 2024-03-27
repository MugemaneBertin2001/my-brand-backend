import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.KEY}@backend.a1mvapj.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority&appName=backend`
    );
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Connection fail");
  }
};


export const testConnectToDatabase = async () => {
  try {
    await mongoose.connect()
    console.log("Your are connected on Test Database");
  } catch (error) {
    console.log("failed to connect on Test Database", error);
  }
};