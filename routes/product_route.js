import express from "express";
import Product_Controller from "../controller/product_Controller.js";
const product_Route = express.Router();


product_Route.get("/",Product_Controller.getAllProducts);


export {product_Route};