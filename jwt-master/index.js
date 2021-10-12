const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth");
const postRoutes = require("./Routes/posts");
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);
app.listen(3000, () => console.log("server at 3000"));
