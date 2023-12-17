import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import blogRoute from "./routes/blog.js";
import authRoute from "./routes/auth.js";

const app = express();

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("เชื่อมต่อ MongoDB สำเร็จ");
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:", error);
  }
}
connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", blogRoute);
app.use("/api", authRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`start server in port ${port}`);
});
