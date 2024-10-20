const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({
      message: "No Token Provided",
    });
  }

  // Verify the token
  jwt.verify(token, "SECRET", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Correctly assign user ID from decoded token to req.userId
    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;
