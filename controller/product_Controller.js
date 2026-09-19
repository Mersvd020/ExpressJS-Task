import {prisma} from "../util/prisma.util.js"


//user/admin

const getProductDBbyId = async(req,res)=>{
  try{
    const {id} = req.params

    if(!Number(id)) return res.status(400).send({status:"unseccessful",message:"bad request"});

    const productDB = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });


    if(!productDB){
      return res.status(404).send({message:"product not found"})
    }
   
    res.status(200).json({
      status: "success",
      data: productDB,
    });
  }catch(error){
    console.error(error);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search,
      minPrice,
      maxPrice,
      minRate,
      maxRate,
      sort = "id",
      order = "asc",
    } = req.query;

    const where = {};

    // Search by name
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Filter price
    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) {
        where.price.gte = Number(minPrice);
      }

      if (maxPrice) {
        where.price.lte = Number(maxPrice);
      }
    }

    // Filter rate
    if (minRate || maxRate) {
      where.rate = {};

      if (minRate) {
        where.rate.gte = Number(minRate);
      }

      if (maxRate) {
        where.rate.lte = Number(maxRate);
      }
    }

    //pagination
    let Page = Number(page);
    let Limit = Number(limit);
    const skip = (Page - 1) * Limit;

    // Sort
    const products = await prisma.Product.findMany({
      where,
      skip,
      take : Limit,
      orderBy: {
        [sort]: order === "desc" ? "desc" : "asc",
      },
    });

    const totalProduct = await prisma.Product.count({
      where
    })
    const totalPage = Math.ceil(totalProduct/Limit);

    res.status(200).json({
      status: "success",

       totalResult: {
       currentPage: Page,
       limit:Limit,
       totalProducts : totalProduct,
       totalPage:totalPage,
       },

      results: products.length,
      data: products
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


///admin

const createProduct = async(req,res)=>{
    try {
    const { name, price, rate, image } = req.body;

    const product = await prisma.product.create({

      
      data: {
        name,
        price,
        rate,
        image,
        releaseDate: new Date().getFullYear(),
      },
    });

    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Product could not be created",
    });
  }
}


const editProduct = async(req,res)=>{

}

const deleteProduct = async(req,res)=>{

}

export default{
  createProduct,
  getAllProducts,
  getProductDBbyId,
  
}