const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
const blogs = require("./routers/blogRoutes");
const users = require("./routers/users");
const messages = require("./routers/messages");
const comments = require("./routers/comments");

// middleware for accept json request
app.use(express.json());
// middleware for accept form request
app.use(express.urlencoded({ extended: true }));

//blog API
app.use("/api/blogs", blogs);
// User endpoints
app.use("/api/users", users);
// Message endpoints
app.use("/api/messages", messages);
// Comment endpoints
app.use("/api/comments", comments);

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
