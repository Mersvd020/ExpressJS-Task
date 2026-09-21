import express from "express";
const user_Route = express.Router();

import user_Controller from "../controller/user_Controller.js";
import image_Controller from "../controller/image_Controller.js";

import { auth_middlware,auth_admin_middlware,auth_user_middlware } from "../middleware/auth.js";
import { productImage_Uploader,userImage_Uploader } from "../util/image.util.js";

import { validate } from "../middleware/error_Handling.js";
import validation from "../validation/user_Validate.js";

//image

user_Route.get("/images",[auth_middlware],image_Controller.getAllUserImage);

user_Route.get("/:id/image",[auth_middlware],image_Controller.getUserImage);


user_Route.post("/:id/image",[auth_middlware],userImage_Uploader.array("userImages",5),image_Controller.uploadUserImages);

user_Route.delete("/:user_id/image/:imageId",[auth_middlware],image_Controller.deleteUserImage);

//admin
user_Route.get("/",[auth_admin_middlware],user_Controller.getAllUser);
user_Route.get("/:id",[auth_admin_middlware],user_Controller.getUserById);

user_Route.patch("/:id",[auth_middlware],user_Controller.editUserInfo);
user_Route.delete("/delete/:id",[auth_admin_middlware],user_Controller.deleteUser);

user_Route.post("/verifyToken",[auth_admin_middlware],user_Controller.verifyToken);

//user /admin

user_Route.post("/register",validate(validation.userRegister_Validate),user_Controller.createUser);

user_Route.post("/login",validate(validation.userLogin_Validate),user_Controller.loginUser);

user_Route.patch("/:id/roleAdmin",[auth_user_middlware],user_Controller.changeRole_admin);
user_Route.patch("/:id/roleUser",[auth_admin_middlware],user_Controller.changeRole_user);



export  {user_Route};