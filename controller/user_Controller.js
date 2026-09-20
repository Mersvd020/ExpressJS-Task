import {prisma} from "../util/prisma.util.js";
import Hash from "../util/hash.util.js";
import JWT from "../util/token.util.js";
import { custom_Error } from "../middleware/error_Handling.js";


// user/admin

const createUser = async(req,res,next)=>{

    try{
    const {userName,email,password} = req.body;

    const user = await prisma.user.findFirst({
        where:{
           email,
          userName
        }
    })

    if(user)  custom_Error("conflict,user exist",409);

    const hashPass = await Hash.hash_Password(password);

    const data = await prisma.user.create({
        data:{
            userName,
            email,
            password : hashPass,
        }
    })
    
    const newRecord = {
        id:data.id,
        userName:data.userName,
        email:data.email,
        role:data.role,
    }
  
    const token = JWT.create_Token(newRecord);

    res.status(201).json({status:"success",message:"user is registered",data:{data:newRecord,token:token}});
   }catch(error){
      next(error)
   }
}

const loginUser = async(req,res,next)=>{

    try {
    const {email,password} = req.body;

    const user = await prisma.user.findFirst({
        where:{
           email,
        }
    })
    // console.log("user:",user);
    if(!user)  custom_Error("user not found", 404);

    const compare_pass = await Hash.compare_Password(password,user.password);

    // console.log("compare:",compare_pass);

    if(!compare_pass)  custom_Error("email or password isn't Valid", 401);

    const theRecord = {
        id:user.id,
        userName:user.userName,
        email:user.email,
        role:user.role,
    }

    // console.log("record:",theRecord);
   
    const token = JWT.create_Token(theRecord);

    // console.log("token:",token);

    res.status(200).json({status:"success",message:"user login successfully",data:{data:theRecord,token:token}});
    } catch(error) {
        next(error);
    }
}

///admin

const verifyToken = (req,res)=>{

    let token =req.headers.authorization;
    token = token?.split(" ")[1];
    if(!token) custom_Error("auhorization failed",401);

    const checkToken = JWT.verify_Token(token);
    if(!checkToken) custom_Error("token is expired or invalid",401);

    res.status(200).json({status:"success",message:"token verified",data:checkToken});
}



const getAllUser = async(req,res)=>{
    const data = await prisma.User.findMany({
        include:{
            images:true,
            favorites:true,
        }
    }); 
    res.status(200).json(data);
}

const getUserById = async(req,res)=>{
    const {id} = req.params;

    if(!id) custom_Error("bad request,id isn't valid",400);

     const user = await prisma.user.findFirst({
        where:{
            id
        },include:{
            images:true,favorites:true
        }
     })

    if(!user) custom_Error("user not found",404);

    res.status(200).json({status:"success",message:"user found",data:user});;
}

const editUser = async(req,res)=>{

}

const deleteUser = async(req,res,next)=>{

    try{
     const {id} = req.params;
    if(!id) custom_Error("bad request,id isn't valid",400);

     const user = await prisma.user.findFirst({
        where:{
            id
        }
     })

     if(!user) custom_Error("user not found",404);

     const userImage = await prisma.userImage.deleteMany({
        where:{
            user_id:id
        }
     })

     const favorite = await prisma.favorite.deleteMany({
        where:{
            user_id:id
        }
     })

     const theUser = await prisma.user.delete({
        where:{
            id
        },include:{
            images:true,favorites:true
        }
     })


     res.status(200).json({status:"success",message:"user and user's info removed completely",data:theUser});
    }catch(error){
        next(error)
    }
}


const changeRole = async(req,res,next,role="user")=>{
  
    try{
    const {id} =req.params;

    if(!id)  custom_Error("there isn't id",400);

    const User = await prisma.user.findFirst({
        where:{
            id
        }
    })
    
    if(!User)  custom_Error("user not found",404);

    if(User.role == "admin" && role == "admin")  custom_Error("you are admin",203);
    if(User.role == "user" && role == "user")  custom_Error("you are user",203);

    const user = await prisma.user.update({
        where:{
            id
        },
        data:{role : role}
    })

    const theRecord = {
        id:user.id,
        userName:user.userName,
        email:user.email,
        role:user.role
    }

    const token  = await JWT.create_Token(theRecord);

    res.status(200).json({status:"success",message:`your role is changed to ${role}`,data:{data:theRecord,token:token}})
  }catch(error){
     next(error)
  }




}

const changeRole_user = (req,res,next)=> changeRole(req,res,next,"user");
const changeRole_admin = (req,res,next)=> changeRole(req,res,next,"admin");



export default {
    verifyToken,
    getAllUser,
    getUserById,
    createUser,
    loginUser,
    editUser,
    deleteUser,
    changeRole_user,
    changeRole_admin
}