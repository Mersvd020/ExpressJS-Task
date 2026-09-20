import { custom_Error } from "../middleware/error_Handling.js";
import {prisma} from "../util/prisma.util.js"


//admin

const createCategory = async(req,res,next)=>{
    
    try{
    const {name} = req.body;

    if(!typeof name === "string") custom_Error("bad request,name isn't valid",400);

    const cat = await prisma.category.findFirst({
        where:{
            name
        },
        
    })

    if(cat) custom_Error("conflict,category exist with this name",409);

    const data = await prisma.category.create({
        data:{name},
        include:{
            products:true
        }
    })

    res.status(201).json({status:"success",message:"category created",data:data});



    }catch(error){
        next(error)
    }



}

const editCategory = async(req,res,next)=>{
    try{
        const {id} = req.params;

        const {name} = req.body;

        if(!typeof name === "string") custom_Error("bad request,name isn't valid",400);

        if(!id) custom_Error("bad request,id isn't valid",400);

         const cat = await prisma.category.update({
        where:{
            id
        },
        data:{
            name
        },include:{
            products:true
        }
        
       })

      if(!cat) custom_Error("category not found",404);

      res.status(200).json({status:"success",message:"category edited successfully",data:cat})



    }catch(error){
        next(error)
    }
}

const deleteCategory = async(req,res,next)=>{
    try{
        
        const {id} = req.params;

        if(!id) custom_Error("bad request,id isn't valid",400);

         const cat = await prisma.category.delete({
        where:{
            id
        },
        include:{
            products:true
        }
        
       })

      if(!cat) custom_Error("category not found",404);

      res.status(200).json({status:"success",message:"category removed successfully",data:cat})



    }catch(error){
        next(error)
    }
}




//user/admin



const getAllCategory = async(req,res,next)=>{
    try{
        const {search} = req.query;

        let where = {};

        if(search){
            where.name = {
                contains:{
                    search
                }
            }
        }

        const cats = await prisma.category.findMany({
            where,
            include:{
                products:true
            }
        })

        if(!cats) custom_Error("no category found",404);

        const Cats = await prisma.category.count({});

     res.status(200).json({
      status: "success",
      totalCount:Cats,
      count:cats.length,
      data: cats
    });


    }catch(error){
        next(error)
    }
}

const getCategoryById = async(req,res,next)=>{
    try{
        const {id} = req.params;

        if(!id) custom_Error("bad request id isn't valid",400);

        const cat = await prisma.category.findFirst({
            where:{
                id:Number(id)
            },
            include:{
                products:true
            }
        })

        if(!cat) custom_Error("no category found",404);

     res.status(200).json({
      status: "success",
      message: "category founded",
      data:cat
    });


    }catch(error){
        next(error)
    }
}

export default {
    createCategory,
    deleteCategory,
    editCategory,
    getAllCategory,
    getCategoryById
}