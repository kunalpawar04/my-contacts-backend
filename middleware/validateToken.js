const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// `next`: allows the middleware to pass control to the next function in the request-response cycle.
// If `next` is not called, the request might be left hanging, and the response may not be sent.
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    // `token`: JWT that you want to verify
    // Splitting the original string wherever a space occurs.
    token = authHeader.split(" ")[1];

    // `process.env.ACCESS_TOKEN_SECRET`: secret key or public key used to verify the JWT's signature
    // `err`: If there is an error during the verification process
    // `decoded`: If the verification is successful, this parameter will contain the decoded payload of the JWT.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorised");
      }
      req.user = decoded.user;
      next();
    });

    // Check if `token` is missing
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;
