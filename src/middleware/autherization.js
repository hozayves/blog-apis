const jwt = require("jsonwebtoken");
// const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("blog-auth-token") || req.query.access_token;
  if (!token) {
    if (req.baseUrl === "/api/likes") {
      return next();
    } else {
      return res
        .status(401)
        .json({ ok: false, message: "Access denied. No token provided" });
    }
  }

  try {
    const decodePayload = jwt.verify(token, process.env.BLOG_JWTPRIVATEKEY);
    req.auth = decodePayload;
    req.isAuthenticated = true;
    next();
  } catch (error) {
    req.isAuthenticated = false;
    res.status(400).json({ ok: false, message: "Invalid token" });
  }
};
