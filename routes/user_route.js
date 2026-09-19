import express from "express";
const user_Route = express.Router();

import user_Controller from "../controller/user_Controller.js";

import user_Validate from "../validation/user_Validate.js";
import { auth_middlware,auth_admin_middlware } from "../middleware/auth.js";

import { validate } from "../middleware/error_Handling.js";
import validation from "../validation/user_Validate.js";

//admin
user_Route.get("/",[auth_admin_middlware],user_Controller.getAllUser);

user_Route.delete("/delete/:id",[auth_admin_middlware],user_Controller.deleteUser);


//user /admin
user_Route.post("/verifyToken",[auth_admin_middlware],user_Controller.verifyToken);

user_Route.post("/register",validate(validation.userRegister_Validate),user_Controller.createUser);

user_Route.post("/login",validate(validation.userLogin_Validate),user_Controller.loginUser);

user_Route.patch("/:id/roleAdmin",[auth_middlware],user_Controller.changeRole_admin);
user_Route.patch("/:id/roleUser",[auth_admin_middlware],user_Controller.changeRole_user);


export  {user_Route};