import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import { connectDb } from "./config/db.js";
import cors from "cors";
import "./config/cloudinary.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
