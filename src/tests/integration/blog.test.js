const fs = require("fs");
const path = require("path");
const request = require("supertest");
const { User } = require("../../models/user");
const { BlogModel } = require("../../models/blogModel");
let server;
let token;
let user;

describe("/api/blogs", () => {
  beforeEach(async () => {
    server = require("../../server");
    user = new User({
      name: "mugishaadfs234",
      email: "mugishsdfsda@gmail.com",
      password: "12345678",
      admin: true,
    });
    await user.save();
    token = user.generateAuthToken();
  }, 10000);
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
    await BlogModel.deleteMany({});
  }, 10000);
  //   CREATE NEW BLOG
  describe("POST /", () => {
    it("should return 400 if title, story, tags, or image is not provided", async () => {
      const res = await request(server)
        .post("/api/blogs")
        .set("blog-auth-token", token)
        .send({
          title: "",
          story: "",
          tags: "",
          image: "",
        });

      expect(res.status).toBe(400);
    });
    it("should return 400 if image is not provided", async () => {
      const res = await request(server)
        .post("/api/blogs")
        .set("blog-auth-token", token)
        .set({
          title: "test title",
          story: "hello world",
          tags: "ui ux",
          image: "",
        });

      expect(res.status).toBe(400);
    });
    it("should return 200 if blog post create successfully", async () => {
      // Assuming you have an image file in the test directory
      const imagePath = path.join(__dirname, "/test-image.png");
      const imageBuffer = fs.readFileSync(imagePath);

      const res = await request(server)
        .post("/api/blogs")
        .set("blog-auth-token", token)
        .attach("image", imageBuffer, { filename: "test-image.png" })
        .field("title", "basic reactjs and tailwindcss")
        .field("story", "hello world")
        .field("tags", "ui ux");
      expect(res.status).toBe(200);
    }, 10000);
  });
  // DELETE A BLOG
  describe("DELETE /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).delete("/api/blogs/342352");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Invalid ID");
      expect(res.body.ok).toBeFalsy();
    });
    it("should return 401 if not token provided", async () => {
      const imagePath = path.join(__dirname, "/test-image.png");
      const imageBuffer = fs.readFileSync(imagePath);

      const newBlog = new BlogModel({
        title: "basic reactjs and tailwindcss",
        story: "hello world",
        tags: "ui ux",
        image: "image-type.png",
        blogger: user._id,
      });
      await newBlog.save();
      const res = await request(server).delete(`/api/blogs/${newBlog._id}`);

      expect(res.status).toBe(401);
    });
    it("should return 403 if user is not authorized", async () => {
      const newUser = new User({
        name: "new user",
        email: "newuser@gmail.com",
        password: "12345678",
        admin: false,
      });
      await newUser.save();
      token = newUser.generateAuthToken();

      const newBlog = new BlogModel({
        title: "basic reactjs and tailwindcss",
        story: "hello world",
        tags: "ui ux",
        image: "image-type.png",
        blogger: user._id,
      });
      await newBlog.save();
      const res = await request(server)
        .delete(`/api/blogs/${newBlog._id}`)
        .set("blog-auth-token", token);

      expect(res.status).toBe(403);
    });
    it("should return 200 if blog deleted", async () => {
      const newBlog = new BlogModel({
        title: "basic reactjs and tailwindcss",
        story: "hello world",
        tags: "ui ux",
        image: "image-type.png",
        blogger: user._id,
      });
      await newBlog.save();
      const res = await request(server)
        .delete(`/api/blogs/${newBlog._id}`)
        .set("blog-auth-token", token);

      expect(res.status).toBe(200);
    });
  });
  // UPDATE A BLOG
  describe("UPDATE /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).put("/api/blogs/342352");
      expect(res.status).toBe(404);
    });
    it("should return 401 if not token provided", async () => {
      const imagePath = path.join(__dirname, "/test-image.png");
      const imageBuffer = fs.readFileSync(imagePath);
      const newBlog = new BlogModel({
        title: "basic reactjs and tailwindcss",
        story: "hello world",
        tags: "ui ux",
        image: "image-type.png",
        blogger: user._id,
      });
      await newBlog.save();
      const res = await request(server)
        .put(`/api/blogs/${newBlog._id}`)
        .send({ title: "new reactjs 18" });

      expect(res.status).toBe(401);
    });
    it("should return 404 if blog to update not found", async () => {
      const res = await request(server)
        .put("/api/blogs/65fd2cb9c621e9ee7538820f")
        .set("blog-auth-token", token);

      expect(res.status).toBe(404);
    });
    it("should return 200 if blog deleted", async () => {
      const newBlog = new BlogModel({
        title: "basic reactjs and tailwindcss",
        story: "hello world",
        tags: "ui ux",
        image: "image-type.png",
        blogger: user._id,
      });
      await newBlog.save();
      const res = await request(server)
        .put(`/api/blogs/${newBlog._id}`)
        .set("blog-auth-token", token)
        .send({ title: "new title" });

      expect(res.status).toBe(200);
    });
  });
  // GET a BLOG
  describe("GET /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/blogs/342352");
    });
    it("should return 404 if blog not found", async () => {
      const res = await request(server).get(
        "/api/blogs/65fd2cb9c621e9ee7538820f"
      );
      expect(res.status).toBe(404);
    });
    it("should return 200 if blog found", async () => {
      const newBlog = new BlogModel({
        title: "basic reactjs and tailwindcss",
        story: "hello world",
        tags: "ui ux",
        image: "image-type.png",
        blogger: user._id,
      });
      await newBlog.save();
      const res = await request(server).get(`/api/blogs/${newBlog._id}`);
      expect(res.status).toBe(200);
    });
  });
  // GET ALL BLOGS
  describe("GET /", () => {
    it("should return 200 if blogs is found", async () => {
      const res = await request(server).get("/api/blogs");

      expect(res.status).toBe(404);
    });
  });
});
