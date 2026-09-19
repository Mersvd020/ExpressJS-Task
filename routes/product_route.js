import express from "express";
import Product_Controller from "../controller/product_Controller.js";
const product_Route = express.Router();

import { validate } from "../middleware/error_Handling.js";
import validation from "../validation/product_Validate.js";
import { auth_middlware,auth_admin_middlware } from "../middleware/auth.js";


product_Route.get("/",Product_Controller.getAllProducts);

product_Route.get("/:id",Product_Controller.getProductDBbyId);

product_Route.post("/",validate(validation.createProduct_Validate),[auth_admin_middlware],Product_Controller.createProduct);

product_Route.put("/:id",validate(validation.createProduct_Validate),[auth_admin_middlware],Product_Controller.editProduct);

product_Route.delete("/:id",[auth_admin_middlware],Product_Controller.deleteProduct);


export {product_Route};