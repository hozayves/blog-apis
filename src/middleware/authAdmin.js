module.exports = function (req, res, next) {
  if (!req.auth.admin)
    return res.status(403).json({ ok: false, message: "Access denied" });

  next();
};
