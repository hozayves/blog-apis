const fs = require("fs");
const path = require("path");
const request = require("supertest");
const { User } = require("../../models/user");
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
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });
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
          blogger: "",
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
    });
  });
});
