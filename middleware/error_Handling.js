import { validationResult } from "express-validator";

const custom_Error = (message = "internal error",statusCode = 500) => {
  
  const newError = new Error(message);
  newError.statusCode = statusCode;
  throw newError;
};

const globalError_Middleware = (error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  console.log("error :", error.message, statusCode, error);
  response.status(statusCode).json({
    status: statusCode,
    message: error.message,
    error : error
  });
}; 


const validate = (validations) => {

    return [
        ...validations,

        (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                // const error = new Error("Validation Error");

                // error.statusCode = 400;
                // error.errors = errors.array();

                // return next(error);

                   return res.status(400).json({
                    status: "failed",
                    message:"invalid input",
                   errors: errors.array()
                  });

            }

            next();
        }
    ];
};


export {
    validate,
    custom_Error,
    globalError_Middleware
};
