const request = require("supertest");
const { User } = require("../../models/user");
const { default: mongoose } = require("mongoose");
let server;
let token;

describe("/api/users", () => {
  beforeEach(async () => {
    server = require("../../server");
    const user = new User({
      name: "mugisha",
      email: "mugisha@gmail.com",
      password: "1234567",
      admin: true,
    });
    await user.save();
    token = user.generateAuthToken();
  }, 10000);
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  }, 10000);
  // Create a user
  describe("POST /", () => {
    it("should return 200 if user sussefully created", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          name: "Yves",
          email: "dfgsdfgsdfgsd@gmail.com",
          password: "12345",
        })
        .timeout(10000);
      expect(res.status).toBe(200);
    });
    it("should return 400 if user is not provide name", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ name: "", email: "abc@abc.abc", password: 123456 });
      expect(res.status).toBe(400);
    });
    it("should return 400 if user is not provide email", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ name: "abcdef", email: "", password: 123456 });
      expect(res.status).toBe(400);
    });
    it("should return 400 if user is not provide password", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ name: "abcdef", email: "abc@abc.abc", password: "" });
      expect(res.status).toBe(400);
    });
    it("should return 400 if user is already exist", async () => {
      const user = new User({
        name: "abcde",
        email: "abc@abc.abc",
        password: "123456789",
      });
      await user.save();

      const res = await request(server)
        .post("/api/users")
        .send({ name: "abcde", email: "abc@abc.abc" });

      expect(res.status).toBe(400);
    });
  });
  // GET ALL USERS
  describe("GET /", () => {
    it("should return all product", async () => {
      await User.collection.insertMany([
        { name: "yves", email: "abc@abc.abc", password: "12345678" },
        { name: "yves", email: "abd@abc.abc", password: "12345678" },
        { name: "yves", email: "abf@abc.abc", password: "12345678" },
      ]);

      const res = await request(server)
        .get("/api/users")
        .set("blog-auth-token", token);

      expect(res.status).toBe(200);
    });
  });
  // DELETE A USER
  describe("DELETE /:id", () => {
    it("should return 400 if user provide invalid id", async () => {
      const res = await request(server)
        .delete("/api/users/1")
        .set("blog-auth-token", token);

      expect(res.status).toBe(400);
    });
    it("should return 404 if a user with given ID is not found", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server)
        .delete(`/api/users/${id}`)
        .set("blog-auth-token", token);
      expect(res.status).toBe(404);
    });
    it("should return 200 if user delete successfully", async () => {
      const user = new User({
        name: "yvess",
        email: "abc@abc.abc",
        password: "ertbnjh",
      });
      await user.save();
      const res = await request(server)
        .delete(`/api/users/${user._id}`)
        .set("blog-auth-token", token);
      expect(res.status).toBe(200);
    });
  });
  // UPDATE A USER
  describe("PUT /:id", () => {
    it("should return 404 if user you want to update is not found", async () => {
      const res = await request(server)
        .put("/api/users/1")
        .set("blog-auth-token", token);
      expect(res.status).toBe(404);
    });
    it("should return 200 if a user updated successfully", async () => {
      const existUser = new User({
        name: "yves",
        email: "absdfc@abc.abc",
        password: "456789",
      });
      await existUser.save();
      let tokkkennn = existUser.generateAuthToken();

      const updatedUser = {
        name: "muhire",
        email: "sfasdfasdf@gmail.com",
        gender: "male",
      };
      const res = await request(server)
        .put(`/api/users`)
        .set("blog-auth-token", tokkkennn)
        .send(updatedUser);

      expect(res.status).toBe(200);
    });
  });
});
