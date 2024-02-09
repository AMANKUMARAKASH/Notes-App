const jwt = require("jsonwebtoken");
const User = require("../Model/user");

async function requireAuth(req, res, next) {
  try {
    // Read token from cookies
    const token = req.cookies.Authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find user using decoded sub
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    // Attach user to req
    req.user = user;

    // Continue on
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized - Token expired" });
    }
    
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = requireAuth;

