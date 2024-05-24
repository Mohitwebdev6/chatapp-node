import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import bodyParser from "body-parser"
import { connectToMongoDB } from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
  connectToMongoDB()
  console.log("listening to port ",PORT);
});
