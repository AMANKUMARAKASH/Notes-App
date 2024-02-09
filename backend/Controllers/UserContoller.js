const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const ms = require("ms");
const User=require("../Model/user");

async function signup(req, res) {
  try {
      // Get email and password from the request body
      const { email, password } = req.body;

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          // If a user with the same email exists, send a conflict response
          return res.status(409).send({ message: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 8);

      // Create a new user with the hashed password
      await User.create({ email, password: hashedPassword });

      // Respond with success status
      return res.sendStatus(200);
  } catch (err) {
      // Handle any errors
      console.error(err);
      return res.sendStatus(500);
  }
}

  async function login(req, res) {
    try {
      // Get the email and password from the request body
      const { email, password } = req.body;
  
      // Find the user with the requested email
      const user = await User.findOne({ email });
      if (!user) return res.sendStatus(401);
  
      // Compare the password sent
      const passwordMatched = bcrypt.compareSync(password, user.password);
      if (!passwordMatched) return res.sendStatus(401);
  
      // Calculate token expiry using ms library
      const exp = Date.now() + ms('30d'); // 30 days expiration
  
      // Create a jwt token
      const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
  
      // Set the cookie
      res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
  
      // Send success status
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }
 function logout(req, res) {
    try {
      res.cookie("Authorization", "", { expires: new Date() });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }
  function checkAuth(req, res) {
    try {
      res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(400);
    }
  }
  
  module.exports = {
    signup,
    login,
    logout,
    checkAuth,
  };