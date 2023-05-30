import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initWebRoute } from "./routes/index.js";

const app = express();

dotenv.config();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//connect db
const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tour");
    console.log("connect success");
  } catch (e) {
    console.log(e);
  }
};
connect();

initWebRoute(app);

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log("server listening on port", port);
});
