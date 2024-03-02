const asyncHandler = require("express-async-handler");
// for securely hashing passwords.
const bcrypt = require("bcrypt");
// creating and verifying JSON Web Tokens
const jwt = require("jsonwebtoken");
// importing userModel as User
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  // if anything missing before registering
  if (!userName || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  // checking if user is already available or not
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    // if already present then return as bad request
    return res.status(400).json({ error: "User already exists" });
  }

  // hashing password and 10 is  The cost factor or number of rounds to use when generating the salt.
  // the higher the cost factor, the more secure but computationally expensive the hashing process becomes.
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password: ", hashedPassword);

  try {
    // creating new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    console.log(`Created User: ${newUser}`);

    return res.status(201).json({ _id: newUser.id, email: newUser.email });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  // taking email and password from request body
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  // comparing password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    // generating new JWT.
    const accessToken = jwt.sign(
      // the payload, which is an object containing the data you want to include in the token
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      // the secret or private key used to sign the token
      process.env.ACCESS_TOKEN_SECRET,
      // specified expiration time of 5 minutes
      { expiresIn: "5m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new error("email or password is invalid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  // piece of user information stored in the request object
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
