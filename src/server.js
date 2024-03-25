const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./helper/documentation");
require("express-async-errors");
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
const likeRoutes = require("./routers/likeRoutes");
const errorHandler = require("./middleware/errorHandling");
const config = require("config");

// Check if jwtPrivateKey defined
// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwtPrivateKey is not defined");
//   process.exit(1);
// }

// middleware for accept json request
app.use(express.json());
// middleware for accept form request
app.use(express.urlencoded({ extended: true }));
// Swagger documentation route
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

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
// Likes endpoint
app.use("/api/likes", likeRoutes);
try {
  if (process.env.NODE_ENV === "test") {
    const db = config.get("db_test");
    mongoose.connect(db);
    console.log(`MongoDB connected ${db}`);
  } else if (process.env.NODE_ENV === "development") {
    const db = config.get("db_local");
    mongoose.connect(db);
    console.log(`MongoDB connected ${db}`);
  } else {
    const db = config.get("db_online");
    mongoose.connect(db);
    console.log(`MongoDB connected ${db}`);
  }
} catch (error) {
  console.log(error);
}

const server = app.listen(port, () => {
  console.log("Listening API on port :" + port);
});

module.exports = server;

app.use(errorHandler);
