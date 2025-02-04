import mongoose, { Error } from "mongoose";

export async function connectDB() {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_DB_URL as string
    );
    console.log(
      `MongoDB successfully connected: ${connection.connection.host}`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log(`Unexpected error: ${error}`);
    }
    process.exit(1);
  }
}
