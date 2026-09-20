import express from "express";
const category_Route = express.Router();

import category_Controller from "../controller/category_Controller.js";

import {auth_admin_middlware } from "../middleware/auth.js";


//admin

category_Route.post("/",category_Controller.createCategory);

category_Route.put("/:id",category_Controller.editCategory);

category_Route.delete("/:id",category_Controller.deleteCategory);

//user /admin

category_Route.get("/",category_Controller.getAllCategory);

category_Route.get("/:id",category_Controller.getCategoryById);




export  {category_Route};