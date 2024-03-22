const sendLikeUnlike = {
  tags: ["Likes"],
  description: "Like or Unlike a blog",
  security: [{ bearerAuth: [] }],
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
              likes: {
                _id: "65f47074618b2cbeb9edaecd",
                likes: [
                  {
                    user: "65ef2d4fd24a2bd73c330534",
                    date: "2024-03-18T13:04:41.494Z",
                    _id: "65f83c490aa78c446681aede",
                  },
                ],
                updatedAt: "2024-03-22T07:59:21.315Z",
                __v: 1,
              },
            },
          },
        },
      },
    },
  },
};
const getLikes = {
  tags: ["Likes"],
  description: "Get likes",
  security: [{ bearerAuth: [] }],
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
              likeCount: 3,
              isLiked: true,
            },
          },
        },
      },
    },
  },
};

const likesDoc = {
  "/api/likes/blogId": {
    post: sendLikeUnlike,
    get: getLikes,
  },
};
module.exports = likesDoc;
