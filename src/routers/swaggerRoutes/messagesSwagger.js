const sendMessage = {
  tags: ["Messages"],
  description: "Message sent",
  requestBody: {
    content: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the person sending the message",
          required: true,
          minLength: 5,
        },
        email: {
          type: "string",
          description: "The email of the person sending the message",
          required: true,
        },
        message: {
          type: "string",
          description: "The content of the message",
          required: true,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Message sent",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: {
                name: "yves",
                email: "valens@gmail.com",
                message: "hello world",
                unread: true,
                _id: "65fd3fed2cda1f8a4033ea1e",
                createdAt: "2024-03-22T08:23:09.430Z",
                updatedAt: "2024-03-22T08:23:09.430Z",
                __v: 0,
              },
            },
          },
        },
      },
    },
  },
};
const getMessages = {
  tags: ["Messages"],
  description: "Get all messages",
  responses: {
    200: {
      description: "Get all messages",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              messages: [
                {
                  _id: "65ee0ac8f300fa26b7fccc56",
                  name: "yves",
                  email: "valens@gmail.com",
                  message: "hello world",
                  unread: true,
                  createdAt: "2024-03-10T19:32:24.071Z",
                  updatedAt: "2024-03-10T19:32:24.071Z",
                },
                {
                  _id: "65ee0afaf300fa26b7fccc59",
                  name: "yves",
                  email: "valens@gmail.com",
                  message: "hello new message",
                  unread: true,
                  createdAt: "2024-03-10T19:33:14.356Z",
                  updatedAt: "2024-03-10T19:33:14.356Z",
                },
              ],
            },
          },
        },
      },
    },
  },
};
const deleteMessage = {
  tags: ["Messages"],
  description: "Delete a message",
  responses: {
    200: {
      description: "Delete a message",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "Message dropped.",
            },
          },
        },
      },
    },
  },
};
const getMessage = {
  tags: ["Messages"],
  description: "Get a message",
  parameters: [
    {
      id: "65eb7b6f2231ebc445fc8c11",
    },
  ],
  responses: {
    200: {
      description: "Get a message",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: {
                _id: "65ee0ac8f300fa26b7fccc56",
                name: "yves",
                email: "valens@gmail.com",
                message: "hello world",
                unread: true,
                createdAt: "2024-03-10T19:32:24.071Z",
                updatedAt: "2024-03-10T19:32:24.071Z",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: false,
              message: "No message found",
            },
          },
        },
      },
    },
  },
};

const messageRoutesDoc = {
  "/api/messages": {
    post: sendMessage,
    get: getMessages,
  },
  "/api/messages/id": {
    delete: deleteMessage,
    get: getMessage,
  },
};

module.exports = messageRoutesDoc;
