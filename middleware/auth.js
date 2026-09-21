import JWT from "../util/token.util.js";
import {custom_Error} from "../middleware/error_Handling.js"



const auth_middlware = (req,res,next,role)=>{


    //  console.log("auth",req.headers.authorization);
    
     let token = req.headers.authorization;
     token = token?.split(" ")[1];
    //  console.log("token",token);

    if(!token)  custom_Error("authentication failed",401);

    const checkToken = JWT.verify_Token(token);
    if(!checkToken)  custom_Error("the token is expired or invalid",401);

    if(role){
     if(checkToken.role !== role) custom_Error("you dont have premission",401);
    }

    req.user = checkToken

    next();

}

const auth_admin_middlware = (req,res,next)=> auth_middlware(req,res,next,"admin");
const auth_user_middlware = (req,res,next)=> auth_middlware(req,res,next,"user");


const checkAuthorization = (req,res,next,role)=>{

    // console.log("headers",req.headers)

    let token = req.headers.authorization;
     token = token?.split(" ")[1];
    // console.log("token",token);
    if(!token) custom_Error("authorization failed",401);

    const checkToken = JWT.verify_Token(token);
    if(!checkToken) custom_Error("token is expired",401);
    // console.log(checkToken);

     if(checkToken.role != role) custom_Error("you dont have premisson to this api",401);
    req.user = checkToken

    next();

}

const checkAuth = (req,res,next)=>{

    // console.log("headers",req.headers)

    let token = req.headers.authorization;
     token = token?.split(" ")[1];
    // console.log("token",token);

    if(!token) custom_Error("authentication failed",token,401);

    const checkToken = JWT.verify_Token(token);
    if(!checkToken) custom_Error("the token is expired",checkToken,401);

    req.user = checkToken

    next();

}



export {
    auth_admin_middlware,
    auth_user_middlware,
    auth_middlware
};