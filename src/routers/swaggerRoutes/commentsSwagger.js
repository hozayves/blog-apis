const sendComment = {
  tags: ["Comments"],
  security: [{ bearerAuth: [] }],
  description: "Send a comment",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            comment: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              comment: {
                comment: "wow",
                user: "65ede5a50edec6a9677b57fc",
                blog: "65f47074618b2cbeb9edaecd",
                replies: [],
                edited: false,
                _id: "65fd3298f706753b6a1e56ae",
                createdAt: "2024-03-22T07:26:16.407Z",
                updatedAt: "2024-03-22T07:26:16.407Z",
                __v: 0,
              },
            },
          },
        },
      },
    },
  },
};
const deleteComment = {
  tags: ["Comments"],
  description: "Delete a comment",
  security: [{ bearerAuth: [] }],
  parameters: [{ id: "65ec47c2449d686516b34477" }],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "Deleted successfuly",
            },
          },
        },
      },
    },
  },
};
const editComment = {
  tags: ["Comments"],
  description: "Edit a comment",
  security: [{ bearerAuth: [] }],
  parameters: [{ id: "65ec47c2449d686516b34477" }],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "Deleted successfuly",
            },
          },
        },
      },
    },
  },
};
const getCommentsByBlogId = {
  tags: ["Comments"],
  security: [{ bearerAuth: [] }],
  description: "Get comments by blogId",
  parameters: [{ blogId: "65f47074618b2cbeb9edaecd" }],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              comments: [],
            },
          },
        },
      },
    },
  },
};

const commentsDoc = {
  "/api/comments": {
    post: sendComment,
  },
  "/api/comments/id": {
    put: editComment,
    delete: deleteComment,
  },
  "/api/comments/blogId": {
    get: getCommentsByBlogId,
  },
};
module.exports = commentsDoc;
