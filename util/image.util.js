import multer from "multer";
import path from "path";

class imageUploader{

 constructor(folderAddress){
 this.folderAddress = folderAddress
 }

 diskStorage = multer.diskStorage({

    destination: (req,file,cb)=> cb(null,`uploads/${this.folderAddress}/`),

    filename: (req,file,cb)=>{
    const ext= path.extname(file.originalname);
    const uniqueName = Date.now();
    cb(null,uniqueName + ext);
    },
});

}

const userImageUpload = new imageUploader("user");
const productImageUpload = new imageUploader("product");

const userImage_Uploader = multer({storage : userImageUpload.diskStorage});
const productImage_Uploader = multer({storage : productImageUpload.diskStorage});

// const uploader = multer({storage : diskStorage});


export {productImage_Uploader,userImage_Uploader};