import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes.ts";
import { connectDB } from "./db/connectDB.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/todo", todoRoutes);

ViteExpress.listen(app, +PORT, () => {
  connectDB();
  console.log("Server is listening on port " + PORT + "...");
});
