const createBlog = {
  description: "Create a new blog",
  tags: ["Blogs"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            story: {
              type: "string",
            },
            tags: {
              type: "string",
            },
            image: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "blog created successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              blog: {
                title: "react friendly beginner",
                story: "hello world",
                tags: ["ui", "ux"],
                image:
                  "http://res.cloudinary.com/shurigroup/image/upload/v1711090874/y1fltwc3pl5eifkjoghg.png",
                blogger: "65ede5a50edec6a9677b57fc",
                _id: "65fd2cb9c621e9ee7538820f",
                likes: [],
                createdAt: "2024-03-22T07:01:13.886Z",
                updatedAt: "2024-03-22T07:01:13.886Z",
                __v: 0,
              },
            },
          },
        },
      },
    },
  },
};
const getAllBlogs = {
  tags: ["Blogs"],
  description: "List all blogs",
  responses: {
    200: {
      description: "blog retrieved",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              blogs: [
                {
                  _id: "65f47074618b2cbeb9edaecd",
                  title: "asdsd",
                  story: "hello world",
                  tags: ["ui", "ux"],
                  image: "image_1710518388303.png",
                  likes: [
                    {
                      user: "65ef2d4fd24a2bd73c330534",
                      date: "2024-03-18T13:04:41.494Z",
                      _id: "65f83c490aa78c446681aede",
                    },
                    {
                      user: "65f47313618b2cbeb9edaf4c",
                      date: "2024-03-18T19:12:21.398Z",
                      _id: "65f898218d155fcacc6ed647",
                    },
                  ],
                  blogger: "65ede5a50edec6a9677b57fc",
                  createdAt: "2024-03-15T15:59:48.505Z",
                  updatedAt: "2024-03-18T19:38:09.436Z",
                  __v: 0,
                },
                {
                  _id: "65f470ae618b2cbeb9edaede",
                  title: "i like to code",
                  story: "hello world",
                  tags: ["backend", "ui"],
                  image: "image_1710518446714.JPG",
                  likes: [],
                  blogger: "65ede5a50edec6a9677b57fc",
                  createdAt: "2024-03-15T16:00:46.727Z",
                  updatedAt: "2024-03-15T16:00:46.727Z",
                  __v: 0,
                },
              ],
            },
          },
        },
      },
    },
  },
};
const getBlog = {
  tags: ["Blogs"],
  description: "Get a blog",
  parameters: [{ id: "65f47074618b2cbeb9edaecd" }],
  responses: {
    200: {
      description: "blog retrieved",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              blog: {
                _id: "65f47074618b2cbeb9edaecd",
                title: "asdsd",
                story: "hello world",
                tags: ["ui", "ux"],
                image: "image_1710518388303.png",
                likes: [
                  {
                    user: "65ef2d4fd24a2bd73c330534",
                    date: "2024-03-18T13:04:41.494Z",
                    _id: "65f83c490aa78c446681aede",
                  },
                  {
                    user: "65f47313618b2cbeb9edaf4c",
                    date: "2024-03-18T19:12:21.398Z",
                    _id: "65f898218d155fcacc6ed647",
                  },
                ],
                blogger: "65ede5a50edec6a9677b57fc",
                createdAt: "2024-03-15T15:59:48.505Z",
                updatedAt: "2024-03-18T19:38:09.436Z",
                __v: 0,
              },
            },
          },
        },
      },
    },
  },
};
const updateBlog = {
  tags: ["Blogs"],
  description: "Update a blog",
  parameters: [{ id: "65f47074618b2cbeb9edaecd" }],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            story: {
              type: "string",
            },
            tags: {
              type: "string",
            },
            image: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Blog updated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              blog: {
                _id: "65fd2cb9c621e9ee7538820f",
                title: "react friendly beginner",
                story: "new storyssssssssssssssssss",
                tags: ["ui", "ux"],
                image:
                  "http://res.cloudinary.com/shurigroup/image/upload/v1711090874/y1fltwc3pl5eifkjoghg.png",
                blogger: "65ede5a50edec6a9677b57fc",
                likes: [],
                createdAt: "2024-03-22T07:01:13.886Z",
                updatedAt: "2024-03-22T07:16:57.204Z",
                __v: 0,
              },
            },
          },
        },
      },
    },
  },
};
const deleteBlog = {
  tags: ["Blogs"],
  description: "Delete a blog",
  parameters: [{ id: "65f47074618b2cbeb9edaecd" }],
  responses: {
    200: {
      description: "Blog deleted",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              message: "Blog deleted.",
            },
          },
        },
      },
    },
  },
};
const blogRoutesDoc = {
  "/api/blogs": {
    post: createBlog,
    get: getAllBlogs,
  },
  "/api/blogs/:id": {
    get: getBlog,
    put: updateBlog,
    delete: deleteBlog,
  },
};

module.exports = blogRoutesDoc;
