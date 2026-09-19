import {body,param,query} from "express-validator";

const createProduct_Validate = [
    body("title")
    .isString()
    .isLength({min:5}).withMessage("title must be at least 5 characters")
    ,
    body("description")
    .isString()
    .isLength({min:10}).withMessage("description must be at least 10 characters")
    ,
    body("price")
    .isInt()
    .isLength({min:4}).withMessage("price must be at least  1,000 toman")
    ,
    body("stock")
    .isInt()
    
]


export default {
   createProduct_Validate
};
