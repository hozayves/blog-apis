require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
const blogRouter = require("./routers/blogRoutes");

// middleware for accept json request
app.use(express.json());
// middleware for accept form request
app.use(express.urlencoded({ extended: true }));

//blog API
app.use("/api/blogs", blogRouter);

mongoose
  .connect(process.env.MONGODB_CONNECT_STRING)
  .then(() => {
    console.log("MongoDB connected successful");
    app.listen(port, () => {
      console.log("Listening API on port :" + port);
    });
  })
  .catch((error) => {
    console.log("Error found in mongodb connection", error);
  });
