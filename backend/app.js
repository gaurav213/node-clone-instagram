import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import cors from "cors";
import post from "./routes/post.js"
import user from "./routes/user.js"
import cookieParser from "cookie-parser";


const app= express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser())
dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection succesfull");
  })
  .catch((err) => console.log(`connection error${err}`));

//using route
app.use("/api/v1",post);
app.use("/api/v1",user);

  

export default app;