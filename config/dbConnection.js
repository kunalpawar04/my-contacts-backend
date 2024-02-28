const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // to connect to the MongoDB database using the mongoose.connect method.
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
        // logs a message indicating that the database is connected.
        // outputs the host and name properties of the Mongoose connection object to the console.
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
