import { custom_Error } from "../middleware/error_Handling.js";
import { prisma } from "../util/prisma.util.js";


const getUserImage = async(req,res,next)=>{
    const {id} = req.params;
    if(!id) custom_Error("bad request,id isn't valid",400);

    const userImages = await prisma.userImage.findMany({
        where:{
            user_id:id
        }
    })

    if(!userImages) custom_Error("no image found",404);

    res.status(200).json({status:"success",message:"image found successfully",data:userImages});
}

const getAllUserImage = async(req,res,next)=>{
   

    const userImages = await prisma.userImage.findMany({
        
    })

    if(!userImages) custom_Error("no image found",404);

    res.status(200).json({status:"success",message:"image found successfully",data:userImages});
}

const uploadUserImages = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
       custom_Error("no image uploaded", 400);
    }

    const user = await prisma.user.findFirst({
         where:{
             id
         }
     });

    if (!user) custom_Error("user not found", 404);

    const baseUrl = `http://localhost:3000`;

    const UserImages = req.files.map((file) => ({
      url: `${baseUrl}/uploads/user/${file.filename}`,
      user_id: id,
    }));

       await prisma.userImage.createMany({
         data:UserImages 
        });

    const images = await prisma.userImage.findMany({
         where:{
            user_id: id
         }
    });

    res.status(201).json({
      status: "success",
      message: `${UserImages.length} images uploaded`,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserImage = async (req, res, next) => {
  try {
    const { user_id,imageId } = req.params;
    if(!imageId || !user_id) custom_Error("bad request,imageId or user_id isn't valid",400);

    const deleted = await prisma.userImage.delete({
      where:{
         id: Number(imageId),
         user_id:user_id
      }
    });
    res.status(200).json({ status: "success",message:"image deleted",data:deleted });
  } catch (error) {
    next(error);
  }
};

// const setUserProfile = async(req,res,next)=>{

//      const {id} = req.params;
//     if(!id) custom_Error("id isn't valid",400);


//     const {imageId} = req.body;

//     const theImage = await prisma.userImage.findFirst({
//         where:{
//             id:imageId
//         }
//     })

//     if(theImage) custom_Error("image not found",404);

//     const user = await prisma.user.update({
//         where:{
//             id
//         },
//         data:{
//             profile_ImageUrl:theImage.url
//         }
//     })

//     if(!user) custom_Error("user not found",404);
    

// }

///product

const getProductImage = async(req,res,next)=>{
    const {id} = req.params;
    if(!id) custom_Error("bad request,id isn't valid",400);

    const productImages = await prisma.productImage.findMany({
        where:{
            product_id:id
        }
    })

    if(!productImages) custom_Error("no image found",404);

    res.status(200).json({status:"success",message:"image found successfully",data:productImages});
}

const uploadProductImages = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
       custom_Error("no image uploaded", 400);
    }

    const product = await prisma.product.findFirst({
         where:{
             id
         }
     });

    if (!product) custom_Error("user not found", 404);

    const baseUrl = `http://localhost:3000`;

    const ProductImages = req.files.map((file) => ({
      url: `${baseUrl}/uploads/product/${file.filename}`,
      product_id: id,
    }));

       await prisma.productImage.createMany({
         data:ProductImages 
        });

    const images = await prisma.productImage.findMany({
         where:{
            product_id: id
         }
    });

    res.status(201).json({
      status: "success",
      message: `${ProductImages.length} images uploaded`,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductImage = async (req, res, next) => {
  try {
    const { product_id,imageId } = req.params;
    if(!imageId || !product_id) custom_Error("bad request,imageId or product_id isn't valid",400);

    const deleted = await prisma.productImage.delete({
      where:{
         id: Number(imageId),
         product_id
      }
    });
    res.status(200).json({ status: "success",message:"image deleted",data:deleted });
  } catch (error) {
    next(error);
  }
};



export default {
    getUserImage,
  uploadUserImages,
  deleteUserImage,
  getAllUserImage,

  getProductImage,
  deleteProductImage,
  uploadProductImages
};
