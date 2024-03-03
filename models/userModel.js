const mongoose = require("mongoose");
// Creating structure of the document for the user
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add user name"],
    },
    email: {
      type: String,
      required: [true, "Please add user email address"],
      unique: true,
      // custom validation function for the email field.
      validate: {
        validator: async function (value) {
          const existingUser = await this.constructor.findOne({ email: value });
          return !existingUser;
        },
        //The error message "Email address already taken" will be returned if validation fails.
        message: "Email address already taken",
      },
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
    },
  },
  {
    timestamps: true,
  }
);

// the model is named "User," and it will interact with the "users" collection in the MongoDB database
module.exports = mongoose.model("User", userSchema);
