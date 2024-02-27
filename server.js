//assigns the express constant to the exported functionality of the "express" module.
const express = require("express");
// helps keep sensitive information separate from your codebase,
//and it allows for easier configuration management across different environments.
const dotenv = require("dotenv").config();

//creating an instance of express(), you are initializing your web application using the Express framework.
const app = express();

//setting up ports (port plays a crucial role in determining how your application communicates over the network.)
const port = process.env.PORT || 5000;

//middleware automatically parses the JSON data and makes it available in req.body
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
