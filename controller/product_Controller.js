import { custom_Error } from "../middleware/error_Handling.js";
import {prisma} from "../util/prisma.util.js"



//user/admin

const getProductDBbyId = async(req,res)=>{
    const {id} = req.params;

    if(!id) custom_Error("id isn't valid",400);

    const product = await prisma.product.findFirst({
      where:{
        id
      }
    })

    if(!product) custom_Error("product not found",404);

    res.status(200).json({status:"success",data:product});
}

const getAllProducts = async (req, res,next) => {
   try{
     const{
       search,
       page=1,
       limit=10,
       sort="price",
       order = "asc",
       minPrice,
       maxPrice,
     } =req.query
   
     let where = {};
    

     if (search) {
      where.title = {
        contains: search,
      };
    }

     if(minPrice || maxPrice){
        
      where.price = {};

      if (minPrice) {
        where.price.gte = Number(minPrice);
      }

      if (maxPrice) {
        where.price.lte = Number(maxPrice);
      }
     }

     let Page = Number(page);
     let Limit = Number(limit);
     const skip = (Page - 1) * Limit;

     const products = await prisma.product.findMany({
      where,
      skip,
      take:Limit,
      orderBy:{
        [sort]:order === "desc" ? "desc" : "asc"
      },
      include:{
        images:true,categories:true
      }
     })


     const totalProduct = await prisma.product.count({})
    const totalPage = Math.ceil(totalProduct/Limit);

    res.status(200).json({
      status: "success",

       pagination: {
       currentPage: Page,
       limit:Limit,
       totalProducts : totalProduct,
       totalPage:totalPage,
       },
      count:products.length,
      data: products
    });


   }catch(error){
    next(error)
   }

};


///admin

const createProduct = async(req,res,next)=>{
  try{
  const {
     title,
     description ,
     stock,
     price 
  } =req.body

  const product = await prisma.product.findFirst({
    where:{
      title
    }
  })
  if(product) custom_Error("conflict,product exist with same title",409);

  const data = await prisma.product.create({
    data:{
      title,
      description,
      stock,
      price
    }
  })

  res.status(201).json({status:"success",message:`the product ${title} is created`,data:data});

}catch(error){
  next(error)
}

  

}


const editProduct = async(req,res,next)=>{

  try{
  const {id} = req.params;
  const {
     title,
     description ,
     stock,
     price 
  } =req.body

    if(!id) custom_Error("id isn't valid",400);

    const theProduct = await prisma.product.findFirst({
      where:{
        id
      }
    })


    if(!theProduct) custom_Error("product not found",404);

    const product = await prisma.product.update({
      where:{
        id
      },
      data:{
        title,
        description,
        price,
        stock
      }
    })

    res.status(200).json({status:"sucess",message:"the product update successfully",data:product});

  }catch(error){
    next(error)
  }


    
}

const deleteProduct = async(req,res)=>{
    const {id} = req.params;

    if(!id) custom_Error("id isn't valid",400);

    const theProduct = await prisma.product.findFirst({
      where:{
        id
      }
    })

     if(!theProduct) custom_Error("product not found",404);

    const product = await prisma.product.delete({
      where:{
        id
      }
    })

    res.status(200).json({status:"success",message:"the product is removed",data:product});


}



export default{
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductDBbyId,
  
}