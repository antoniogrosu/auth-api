const jwt = require("jsonwebtoken");
const UnAuthenticatedError = require("../errors/index");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("No token provided");
  }
};

module.exports = authenticationMiddleware;
