//IMPORTS
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routes/UserRoutes.js";

//SERVER CREATION
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
dotenv.config();
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});

// //MONGOOSE CONNECTION
// mongoose.connect(process.env.MONGO_URI).then((db) => {
//   console.log("Connected to Mongo Successfully");
// });