const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;
const User = require("../schema/user");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  
  try {
    if (!token) {
      throw new Unauthorized("Not authorized");
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken.id, token }); 
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    
    req.user = user;
    next();
  } catch (error) {
    next(error); 
  }
};

module.exports = authMiddleware;

