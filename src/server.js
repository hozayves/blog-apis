const cors = require("cors");
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
const auths = require("./routers/auths");
const errorHandler = require("./middleware/errorHandling");
const config = require("config");

// Check if jwtPrivateKey defined
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

// middleware for accept json request
app.use(express.json());
// middleware for accept form request
app.use(express.urlencoded({ extended: true }));

// use cors
app.use(cors());

//blog API
app.use("/api/blogs", blogs);
// User endpoints
app.use("/api/users", users);
// Message endpoints
app.use("/api/messages", messages);
// Comment endpoints
app.use("/api/comments", comments);
// Authentication endpoint
app.use("/api/auths", auths);

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

app.use(errorHandler);
