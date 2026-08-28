const crypto = require("crypto")


let allData = [
    // {id:1,title:"mock task",completed:false,createdAt:"2026-08-27T14:42:54.541Z" }
    
]

const getTask =(req,res)=>{
   res.status(200).json({totalData:allData.length,data:allData});
}

const getTaskById = (req,res)=>{
    const {id} = req.params;
    if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

     const theRecord = allData.find(el => el.id == id);
     if(!theRecord) return res.status(404).json({message:"task not found"})
     
     res.status(200).json({data:theRecord});    

}

const createTask = (req,res)=>{
    const {title} = req.body;
    
    if(typeof title !== "string") return res.status(400).json({status:"failed",error:"input type isnt correct"});
    
    const newRecord = {
        id: crypto.randomInt(2,1000),
        title:title,
        completed:false,
        createdAt:new Date()
    }

    allData.push(newRecord);
    res.status(201).json({status:"success",data:newRecord});
}

const editTask = (req,res)=>{
    const {id} = req.params;
    const {title} = req.body;
    if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

    const theRecord = allData.find(el => el.id == id);
    if(!theRecord) return res.status(404).json({message:"task not found"})

    if(typeof title !== "string") return res.status(400).json({status:"failed",error:"input type isnt correct"});

    allData = allData.filter(el => el.id != id);
    const newRecord = {
        id:Number(id),
        title:title,
        completed:false,
        createdAt:new Date()
    }
    allData.push(newRecord)

    res.status(200).json({status:"success",data:newRecord});
}

const IsCompletedTask = (req,res)=>{
     const {id} = req.params;
     if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

     const theRecord = allData.find(el => el.id == id);
     if(!theRecord) return res.status(404).json({message:"task not found"})
     
     allData = allData.filter(el => el.id != id);

     const newRecord = {
        id:theRecord.id,
        title:theRecord.title,
        completed:true,
        createdAt:theRecord.createdAt
      }    
     
     allData.push(newRecord);
     res.status(200).json({status:"success",data:newRecord,message:"task is completed"});
}

const DeleteTask = (req,res)=>{
   const {id} = req.params;
   if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

   const theRecord = allData.find(el => el.id == id);
   if(!theRecord) return res.status(404).json({message:"task not found"})

   allData = allData.filter(el => el.id !=id); 
   
   res.status(200).json({status:"sucess",message:"the task is removed"});
}

const uploaderTaskFile = (req,res)=>{
     const {id} = req.params
     const file = req.file;

     if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});
      const theRecord = allData.find(el => el.id == id);
      if(!theRecord) return res.status(404).json({message:"task not found"})
      if(!file) return res.status(400).json({status:"failed",error:"file isnt uploaded"})

     const attachmentPath ="http://localhost:3000/uploads/" + file.filename;

     allData = allData.filter(el => el.id != id);

     const newRecord = {
        id:theRecord.id,
        title:theRecord.title,
        completed:true,
        attachmentPath,
        createdAt:theRecord.createdAt
      }
    
    allData.push(newRecord);
    
    res.status(200).json({status:"success",data:newRecord,message:"file is uploaded"})
     
  
}

module.exports = {
    getTask,
    getTaskById,
    createTask,
    editTask,
    IsCompletedTask,
    DeleteTask,
    uploaderTaskFile 
}