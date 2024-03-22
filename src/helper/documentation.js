const userRoutesDoc = require("../routers/swaggerRoutes/usersSwagger");
const blogRoutesDoc = require("../routers/swaggerRoutes/blogsSwagger");
const commentRoutesDoc = require("../routers/swaggerRoutes/commentsSwagger");
const likesRoutesDoc = require("../routers/swaggerRoutes/likeSwagger");
const messageRoutesDoc = require("../routers/swaggerRoutes/messagesSwagger");
const documentation = {
  openapi: "3.0.0",
  info: {
    title: "Blog API",
    version: "0.0.1",
    // description: "hello world",
  },
  servers: [
    {
      url: "http://localhost:9000",
      description: "Development server",
    },
    {
      url: "https://blog-apis-nfgp.onrender.com",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        name: "blog-auth-token",
        in: "header",
        description: "Bearer token authorization",
      },
    },
  },
  tags: [
    {
      name: "Users",
      description: "Operations about users",
    },
    {
      name: "Blogs",
      description: "Operations about blogs",
    },
    {
      name: "Comments",
      description: "Operations about comments",
    },
    {
      name: "Likes",
      description: "Operations about likes",
    },
    {
      name: "Messages",
      description: "Operations about messages",
    },
  ],
  paths: {
    ...userRoutesDoc,
    ...blogRoutesDoc,
    ...commentRoutesDoc,
    ...likesRoutesDoc,
    ...messageRoutesDoc,
  },
};

module.exports = documentation;
