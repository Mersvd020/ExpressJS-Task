const crypto = require("crypto")
const fs = require('fs');

const taskDataPath = "./data/task.json";
const taskData = require("../data/task.json");



const getTask =(req,res)=>{
    // let rawdata = fs.readFileSync(taskDataPath);
    // let Data= JSON.parse(rawdata);

    const {completed,search,page=1,limit=3} = req.query;
    let allData = [...taskData];
    let totalPage = Math.ceil(allData.length/Number(limit));
    let totalData = allData.length
    
    if(!Number(page) || !Number(limit)) return res.status(400).json({message:"bad request : query input"})
    
    if(completed){
        allData = allData.filter(el => String(el.completed) === completed)
    }

    if(search){
        allData = allData.filter(el => (el.title).includes(search))
    }

    let a = Number(limit)*(page-1);
    let b = Number(limit)*(page) ;
    if(page,limit){
       allData = allData.slice(a,b);
    }
    
  res.status(200).json({
        totalPage:totalPage,
        totalData:totalData,
        data:{
         totalData:allData.length,
         data:allData
        }});
}

const getTaskById = (req,res)=>{
    const {id} = req.params;
    if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

    let rawdata = fs.readFileSync(taskDataPath);
    let Data= JSON.parse(rawdata);

     const theRecord = Data.find(el => el.id == id);
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
    
    /////
    let allData = [...taskData];
    allData.push(newRecord);
    let Data = JSON.stringify(allData);
    fs.writeFileSync(taskDataPath, Data, "UTF-8",{'flags': 'a'});
    /////

    res.status(201).json({status:"success",data:newRecord});
}

const editTask = (req,res)=>{
    const {id} = req.params;
    const {title} = req.body;
    if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

    const theRecord = taskData.find(el => el.id == id);
    if(!theRecord) return res.status(404).json({message:"task not found"})

    if(typeof title !== "string") return res.status(400).json({status:"failed",error:"input type isnt correct"});

    let allData = [...taskData];
    allData = allData.filter(el => el.id != id);

    const newRecord = {
        id:Number(id),
        title:title,
        completed:false,
        createdAt:new Date()
    }

    /////
    allData.push(newRecord);
    let Data = JSON.stringify(allData);
    fs.writeFileSync(taskDataPath, Data, "UTF-8",{'flags': 'a'});
    /////
    
    res.status(200).json({status:"success",data:newRecord});
}

const IsCompletedTask = (req,res)=>{
     const {id} = req.params;
     if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

     const theRecord = taskData.find(el => el.id == id);
     if(!theRecord) return res.status(404).json({message:"task not found"})
     if(theRecord.completed) return res.status(422).json({message:"task was completed before"})
     let allData = [...taskData];
     allData = allData.filter(el => el.id != id);

     const newRecord = {
        id:theRecord.id,
        title:theRecord.title,
        completed:true,
        createdAt:theRecord.createdAt
      }    
     
     /////
    allData.push(newRecord);
    let Data = JSON.stringify(allData);
    fs.writeFileSync(taskDataPath, Data, "UTF-8",{'flags': 'a'});
    /////

     res.status(200).json({status:"success",data:newRecord,message:"task is completed"});
}

const ToggleCompletedTask = (req,res)=>{
     const {id} = req.params;
     if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

     const theRecord = taskData.find(el => el.id == id);
     if(!theRecord) return res.status(404).json({message:"task not found"})
     
     let allData = [...taskData];
     allData = allData.filter(el => el.id != id);

     const newRecord = {
        id:theRecord.id,
        title:theRecord.title,
        completed:!(theRecord.completed),
        createdAt:theRecord.createdAt
      }    
     
     /////
    allData.push(newRecord);
    let Data = JSON.stringify(allData);
    fs.writeFileSync(taskDataPath, Data, "UTF-8",{'flags': 'a'});
    /////

     res.status(200).json({status:"success",data:newRecord,message:"task is completed"});
}


const DeleteTask = (req,res)=>{
   const {id} = req.params;
   if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});

   const theRecord = taskData.find(el => el.id == id);
   if(!theRecord) return res.status(404).json({message:"task not found"})
   
   let allData = [...taskData];
   allData = allData.filter(el => el.id !=id); 

    /////
    let Data = JSON.stringify(allData);
    fs.writeFileSync(taskDataPath, Data, "UTF-8",{'flags': 'a'});
    /////
   
   res.status(200).json({status:"sucess",message:"the task is removed"});
}

const uploaderTaskFile = (req,res)=>{
     const {id} = req.params
     const file = req.file;

     if(!Number(id)) return res.status(400).json({status:"failed",error:"input type isnt correct"});
      const theRecord = taskData.find(el => el.id == id);
      if(!theRecord) return res.status(404).json({message:"task not found"})
      if(!file) return res.status(400).json({status:"failed",error:"file isnt uploaded"})

     const attachmentPath ="http://localhost:3000/uploads/" + file.filename;
    
     let allData = [...taskData];
     allData = allData.filter(el => el.id != id);

     const newRecord = {
        id:theRecord.id,
        title:theRecord.title,
        completed:true,
        attachmentPath,
        createdAt:theRecord.createdAt
      }
    
    /////
    allData.push(newRecord);
    let Data = JSON.stringify(allData);
    fs.writeFileSync(taskDataPath, Data, "UTF-8",{'flags': 'a'});
    /////
    
    res.status(200).json({status:"success",data:newRecord,message:"file is uploaded"})
     
  
}

module.exports = {
    getTask,
    getTaskById,
    createTask,
    editTask,
    IsCompletedTask,
    ToggleCompletedTask,
    DeleteTask,
    uploaderTaskFile 
}