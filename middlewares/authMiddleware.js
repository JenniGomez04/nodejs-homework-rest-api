const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { JWT_SECRET } = process.env;
const { User } = require("../schema");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if(error.message === "Invalid sugnature"){
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
