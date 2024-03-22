// POST A NEW USER
const postUser = {
  tags: ["Users"],
  description: "CREATE A NEW USER",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "User created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "mubera erick created successful.",
              user: {
                name: "mubera erick",
                email: "musangwa@gmail.com",
                _id: "65fc8baa15e6768fa85906e6",
              },
            },
          },
        },
      },
    },
  },
  // security: [{ bearerAuth: [] }],
};
const getUsers = {
  tags: ["Users"],
  description: "GET ALL USERS",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Users retrieved",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              users: [
                {
                  _id: "65fc8baa15e6768fa85906e6",
                  name: "mubera erick",
                  email: "musangwa@gmail.com",
                  profile: null,
                },
                {
                  _id: "65fc8baa15e6768fa85906a9",
                  name: "mugisha benjamin",
                  email: "mugisha205@gmail.com",
                  profile: null,
                },
              ],
            },
          },
        },
      },
    },
  },
};
const getUser = {
  tags: ["Users"],
  description: "GET USER BY ID",
  security: [{ bearerAuth: [] }],
  parameters: [
    {
      _id: "65fc8baa15e6768fa85906a9",
    },
  ],
  responses: {
    200: {
      description: "User retrieved",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              userWithTime: {
                _id: "65fc8baa15e6768fa85906e6",
                name: "mubera erick",
                profile: null,
                creationTime: "2024-03-21T19:34:02.000Z",
              },
            },
          },
        },
      },
    },
  },
};
const deleteUser = {
  tags: ["Users"],
  description: "DELETE USER BY ID",
  security: [{ bearerAuth: [] }],
  parameters: [
    {
      _id: "65fc8baa15e6768fa85906a9",
    },
  ],
  responses: {
    200: {
      description: "User deleted",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "ganza Deleted!",
            },
          },
        },
      },
    },
  },
};
const putUser = {
  tags: ["Users"],
  description: "PUT USER BY ID",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "User updated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: {
                _id: "65ede5a50edec6a9677b57fc",
                name: "mubera eric gabriel",
                email: "muberaerick@gmail.com",
                profile: "profile_1710520247831.jpg",
                gender: "male",
              },
            },
          },
        },
      },
    },
  },
};
const changeProfile = {
  tags: ["Users"],
  description: "CHANGE USER PROFILE",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "User updated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "Profile removed.",
            },
          },
        },
      },
    },
  },
};
const deleteProfile = {
  tags: ["Users"],
  description: "DELETE USER PROFILE",
  parameters: [
    {
      _id: "65fc8baa15e6768fa85906a9",
    },
  ],
  responses: {
    200: {
      description: "User updated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "mugisha benjamin updated successful.",
            },
          },
        },
      },
    },
  },
};
const userRoutesDoc = {
  "/api/users": {
    post: postUser,
    get: getUsers, //
    put: putUser,
  },
  "api/users/profile/del": {
    delete: deleteProfile,
  },
  "/api/users/profile": {
    post: changeProfile,
  },
  "/api/users/id": {
    get: getUser,
    delete: deleteUser,
  },
};

module.exports = userRoutesDoc;
