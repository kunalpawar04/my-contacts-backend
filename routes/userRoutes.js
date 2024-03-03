const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

// Route for handling user registration
router.post("/register", registerUser);

// Route for handling user login
router.post("/login", loginUser);

/*
  Middleware functions can perform actions before passing control to the next middleware function in the stack.
  validateToken is used as middleware, and it checks if the request has a valid token before allowing access to the currentUser function.
*/
router.get("/current", validateToken, currentUser);

module.exports = router;
