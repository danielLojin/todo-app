import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes.ts";
import { connectDB } from "./db/connectDB.ts";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/todo", todoRoutes);

ViteExpress.listen(app, 3000, () => {
  connectDB();
  console.log("Server is listening on http://localhost:3000...");
});
