const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.BadRequest:
      res.json({
        title: "Validation Failed",
        message: err.message,
        //By logging err.stack, you get a detailed output that can help you debug and trace back the sequence of function calls that led to the error.
        stackTrace: err.stack,
      });
      break;
    case constants.Forbidden:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.InternalServerError:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.Unauthorized:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NotFound:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error. All OK.");
      break;
  }
};

module.exports = errorHandler;
