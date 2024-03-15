const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("blog-auth-token") || req.query.access_token;
  if (!token)
    return res
      .status(401)
      .json({ ok: false, message: "Access denied. No token provided" });

  try {
    const decodePayload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.auth = decodePayload;
    next();
  } catch (error) {
    res.status(400).json({ ok: false, message: "Invalid token" });
  }
};
