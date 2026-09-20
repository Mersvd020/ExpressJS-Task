import {body} from "express-validator";

const category_Validate = [
   
    body("product_id")
    .isString()
    .withMessage("product_id required")
    ,
    body("category_ids")
    .isArray()
    .withMessage("categoryIds required , must be integer")
]

export default{category_Validate}