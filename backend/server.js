import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
  console.log("listening to port ",PORT);
});
