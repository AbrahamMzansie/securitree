const jwt = require("jsonwebtoken");

const requireSignIn = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRECT);
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ message: "Error authenticating a token" });
  }
};

const userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(401).json({ message: "User access denied" });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Admin access denied" });
  }
  next();
};
module.exports = {
  requireSignIn,
  adminMiddleware,
  userMiddleware,
};
